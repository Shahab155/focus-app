import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await sql`SELECT name, email, image, password FROM users WHERE id = ${session.user.id}`;
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      image: user.image,
      hasPassword: !!user.password
    });
  } catch (error) {
    console.error("API user fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
