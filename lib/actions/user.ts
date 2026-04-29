"use server";

import { sql } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const image = formData.get("image") as string;

  try {
    await sql`
      UPDATE users 
      SET name = ${name}, image = ${image}
      WHERE id = ${session.user.id}
    `;

    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function updatePassword(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" };
  }

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  try {
    const users = await sql`SELECT password FROM users WHERE id = ${session.user.id}`;
    const user = users[0];

    if (!user || !user.password) {
      return { error: "User has no local password (signed in with OAuth?)" };
    }

    const isPasswordCorrect = await (await import("bcryptjs")).default.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return { error: "Current password is incorrect" };
    }

    const hashedPassword = await (await import("bcryptjs")).default.hash(newPassword, 12);
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE id = ${session.user.id}
    `;

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password update error:", error);
    return { error: "Failed to update password" };
  }
}
