"use server";

import { sql } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createGoal(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title) return { error: "Title is required" };

  try {
    // Check goal count
    const goals = await sql`SELECT count(*) FROM goals WHERE user_id = ${session.user.id}`;
    const count = parseInt(goals[0].count);

    if (count >= 3) {
      return { error: "You can only have a maximum of 3 goals" };
    }

    await sql`
      INSERT INTO goals (user_id, title, description)
      VALUES (${session.user.id}, ${title}, ${description})
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating goal:", error);
    return { error: "Failed to create goal" };
  }
}

export async function updateGoal(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title) return { error: "Title is required" };

  try {
    const result = await sql`
      UPDATE goals 
      SET title = ${title}, description = ${description}
      WHERE id = ${id} AND user_id = ${session.user.id}
      RETURNING id
    `;

    if (result.length === 0) {
      return { error: "Goal not found or unauthorized" };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating goal:", error);
    return { error: "Failed to update goal" };
  }
}

export async function deleteGoal(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const result = await sql`
      DELETE FROM goals 
      WHERE id = ${id} AND user_id = ${session.user.id}
      RETURNING id
    `;

    if (result.length === 0) {
      return { error: "Goal not found or unauthorized" };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting goal:", error);
    return { error: "Failed to delete goal" };
  }
}

export async function getUserGoals() {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const goals = await sql`
      SELECT * FROM goals 
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;
    return goals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}
export async function getWeeklyReport() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const userId = session.user.id;

  try {
    const report = await sql`
      WITH last_7_days AS (
        SELECT (CURRENT_DATE - i)::date as report_date
        FROM generate_series(0, 6) as i
      ),
      goal_action_days AS (
        SELECT g.id as goal_id, ga.id as action_id, ga.name as action_name, d.report_date
        FROM goals g
        JOIN goal_actions ga ON ga.goal_id = g.id
        CROSS JOIN last_7_days d
        WHERE g.user_id = ${userId}
      ),
      daily_progress AS (
        SELECT 
          gad.goal_id,
          gad.action_id,
          gad.action_name,
          gad.report_date,
          CASE 
            WHEN ga.target_value IS NOT NULL AND ga.target_value > 0 
              THEN LEAST(100, (COALESCE(al.completed_value, 0)::float / ga.target_value) * 100)
            WHEN ga.target_value IS NULL AND COALESCE(al.completed_value, 0) >= 1 
              THEN 100
            ELSE 0 
          END as action_percentage,
          COALESCE(al.completed_value, 0) as completed_value
        FROM goal_action_days gad
        JOIN goal_actions ga ON ga.id = gad.action_id
        LEFT JOIN daily_logs dl ON dl.user_id = ${userId} AND dl.date = gad.report_date
        LEFT JOIN action_logs al ON al.action_id = gad.action_id AND al.daily_log_id = dl.id
      ),
      action_summaries AS (
        SELECT 
          goal_id,
          action_name,
          ROUND(AVG(action_percentage))::int as avg_percentage
        FROM daily_progress
        GROUP BY goal_id, action_id, action_name
      )
      SELECT 
        g.title,
        ROUND(AVG(dp.action_percentage))::int as avg_progress,
        SUM(dp.completed_value)::int as total_completed,
        (SELECT unit FROM goal_actions WHERE goal_id = g.id LIMIT 1) as unit,
        (
          SELECT json_agg(json_build_object('name', action_name, 'avg_percentage', avg_percentage))
          FROM action_summaries 
          WHERE action_summaries.goal_id = g.id
        ) as actions
      FROM goals g
      JOIN daily_progress dp ON dp.goal_id = g.id
      WHERE g.user_id = ${userId}
      GROUP BY g.id, g.title
    `;
    return report;
  } catch (error) {
    console.error("Error fetching weekly report:", error);
    return [];
  }
}
