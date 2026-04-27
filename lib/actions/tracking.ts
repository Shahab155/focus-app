"use server";

import { sql } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createGoalAction(goalId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const targetValue = formData.get("targetValue") 
    ? parseInt(formData.get("targetValue") as string) 
    : null;

  if (!name) return { error: "Action name is required" };

  try {
    // Verify goal ownership
    const goals = await sql`SELECT id FROM goals WHERE id = ${goalId} AND user_id = ${session.user.id}`;
    if (goals.length === 0) return { error: "Goal not found or unauthorized" };

    await sql`
      INSERT INTO goal_actions (goal_id, name, target_value)
      VALUES (${goalId}, ${name}, ${targetValue})
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating action:", error);
    return { error: "Failed to create action" };
  }
}

export async function updateProgress(actionId: string, value: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const today = new Date().toISOString().split('T')[0];

  try {
    // 0. Validate input and check target_value
    const actions = await sql`
      SELECT target_value 
      FROM goal_actions ga
      JOIN goals g ON ga.goal_id = g.id
      WHERE ga.id = ${actionId} AND g.user_id = ${session.user.id}
    `;

    if (actions.length === 0) return { error: "Action not found or unauthorized" };
    
    const targetValue = actions[0].target_value;
    const finalValue = Math.max(0, value);
    
    if (targetValue !== null && finalValue > targetValue) {
      return { error: `Progress cannot exceed target (${targetValue})` };
    }

    // 1. Get or create daily log
    let dailyLogId: string;
    const existingLogs = await sql`
      SELECT id FROM daily_logs 
      WHERE user_id = ${session.user.id} AND date = ${today}
    `;

    if (existingLogs.length > 0) {
      dailyLogId = existingLogs[0].id;
    } else {
      const newLogs = await sql`
        INSERT INTO daily_logs (user_id, date)
        VALUES (${session.user.id}, ${today})
        RETURNING id
      `;
      dailyLogId = newLogs[0].id;
    }

    // 2. Update or create action log
    await sql`
      INSERT INTO action_logs (daily_log_id, action_id, completed_value)
      VALUES (${dailyLogId}, ${actionId}, ${finalValue})
      ON CONFLICT (daily_log_id, action_id)
      DO UPDATE SET completed_value = ${finalValue}
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating progress:", error);
    return { error: "Failed to update progress" };
  }
}

export async function getTodayProgress() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const today = new Date().toISOString().split('T')[0];

  try {
    const progress = await sql`
      WITH streak_logs AS (
        SELECT 
          al.action_id,
          dl.date,
          ROW_NUMBER() OVER (PARTITION BY al.action_id ORDER BY dl.date DESC) as rn
        FROM action_logs al
        JOIN daily_logs dl ON al.daily_log_id = dl.id
        WHERE al.completed_value > 0
      ),
      streaks AS (
        SELECT 
          action_id,
          COUNT(*) as current_streak
        FROM (
          SELECT 
            action_id,
            date,
            rn,
            (CURRENT_DATE - date)::int as diff
          FROM streak_logs
        ) s
        WHERE (
          -- Today is completed, count from today
          (EXISTS (SELECT 1 FROM streak_logs sl2 WHERE sl2.action_id = s.action_id AND sl2.date = CURRENT_DATE) AND diff = rn - 1)
          OR
          -- Today is NOT completed, but yesterday was, count from yesterday
          (NOT EXISTS (SELECT 1 FROM streak_logs sl2 WHERE sl2.action_id = s.action_id AND sl2.date = CURRENT_DATE) AND diff = rn)
        )
        GROUP BY action_id
      )
      SELECT 
        ga.id as action_id,
        ga.goal_id,
        ga.name,
        ga.target_value,
        COALESCE(al.completed_value, 0) as completed_value,
        CASE 
          WHEN ga.target_value IS NOT NULL AND ga.target_value > 0 
            THEN LEAST(100, ROUND((COALESCE(al.completed_value, 0)::float / ga.target_value) * 100))::int
          WHEN ga.target_value IS NULL AND COALESCE(al.completed_value, 0) >= 1 
            THEN 100
          ELSE 0 
        END as percentage,
        COALESCE(s.current_streak, 0) as streak
      FROM goal_actions ga
      JOIN goals g ON ga.goal_id = g.id
      LEFT JOIN daily_logs dl ON dl.user_id = g.user_id AND dl.date = ${today}
      LEFT JOIN action_logs al ON al.action_id = ga.id AND al.daily_log_id = dl.id
      LEFT JOIN streaks s ON s.action_id = ga.id
      WHERE g.user_id = ${session.user.id}
    `;
    return progress;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return [];
  }
}

export async function deleteAction(actionId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    try {
        // Verify ownership through goal
        const result = await sql`
            DELETE FROM goal_actions
            WHERE id = ${actionId} AND goal_id IN (SELECT id FROM goals WHERE user_id = ${session.user.id})
            RETURNING id
        `;
        
        if (result.length === 0) return { error: "Action not found or unauthorized" };
        
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting action:", error);
        return { error: "Failed to delete action" };
    }
}
