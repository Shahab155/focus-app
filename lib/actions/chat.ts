"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function sendMessageToAgent(message: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = (session.user as any).id;

  try {
    const response = await fetch("https://focus-ai-agent-production.up.railway.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to communicate with AI agent");
    }

    const data = await response.json();
    
    // Revalidate the dashboard to show fresh data if any tools were called
    revalidatePath("/dashboard");
    
    return data.reply as string;
  } catch (error: any) {
    console.error("Chat Agent Error:", error);
    throw new Error(error.message || "Failed to get response from AI");
  }
}
