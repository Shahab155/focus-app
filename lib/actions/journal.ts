"use server";

import { sql } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function saveJournalEntry(content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  if (!content || content.trim().length === 0) {
    return { error: "Content cannot be empty" };
  }

  const today = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO journal_entries (user_id, content, date)
      VALUES (${session.user.id}, ${content}, ${today})
      ON CONFLICT (user_id, date)
      DO UPDATE SET content = ${content}
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving journal entry:", error);
    return { error: "Failed to save entry" };
  }
}

export async function getTodayJournalEntry() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const today = new Date().toISOString().split('T')[0];

  try {
    const entries = await sql`
      SELECT * FROM journal_entries 
      WHERE user_id = ${session.user.id} AND date = ${today}
    `;
    return entries[0] || null;
  } catch (error) {
    console.error("Error fetching today's entry:", error);
    return null;
  }
}

export async function getJournalHistory() {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const entries = await sql`
      SELECT id, date, content, created_at 
      FROM journal_entries 
      WHERE user_id = ${session.user.id}
      ORDER BY date DESC
    `;
    return entries;
  } catch (error) {
    console.error("Error fetching journal history:", error);
    return [];
  }
}
