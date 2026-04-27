"use server";

import { sql } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createAvoidItem(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  if (!name) return { error: "Name is required" };

  try {
    await sql`
      INSERT INTO avoid_items (user_id, name)
      VALUES (${session.user.id}, ${name})
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating avoid item:", error);
    return { error: "Failed to create item" };
  }
}

export async function getAvoidItemsWithLogs() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const today = new Date().toISOString().split('T')[0];

  try {
    const items = await sql`
      SELECT 
        ai.id, 
        ai.name,
        COALESCE(al.avoided, true) as avoided
      FROM avoid_items ai
      LEFT JOIN avoid_logs al ON al.avoid_item_id = ai.id AND al.date = ${today}
      WHERE ai.user_id = ${session.user.id}
      ORDER BY ai.created_at ASC
    `;
    return items;
  } catch (error) {
    console.error("Error fetching avoid items:", error);
    return [];
  }
}

export async function updateAvoidStatus(itemId: string, avoided: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const today = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO avoid_logs (user_id, avoid_item_id, date, avoided)
      VALUES (${session.user.id}, ${itemId}, ${today}, ${avoided})
      ON CONFLICT (user_id, avoid_item_id, date)
      DO UPDATE SET avoided = ${avoided}
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating avoid status:", error);
    return { error: "Failed to update status" };
  }
}

export async function deleteAvoidItem(itemId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    try {
        await sql`
            DELETE FROM avoid_items 
            WHERE id = ${itemId} AND user_id = ${session.user.id}
        `;
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting avoid item:", error);
        return { error: "Failed to delete item" };
    }
}
