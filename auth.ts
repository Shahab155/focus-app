import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
        const user = users[0];

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUsers = await sql`SELECT * FROM users WHERE email = ${user.email}`;
          let dbUser = existingUsers[0];

          if (!dbUser) {
            // Create user
            const newUsers = await sql`
              INSERT INTO users (name, email, image)
              VALUES (${user.name}, ${user.email}, ${user.image})
              RETURNING id
            `;
            dbUser = newUsers[0];
          }

          // Check if account exists
          const existingAccounts = await sql`
            SELECT * FROM accounts 
            WHERE provider = ${account.provider} 
            AND provider_account_id = ${account.providerAccountId}
          `;

          if (existingAccounts.length === 0) {
            await sql`
              INSERT INTO accounts (
                user_id, type, provider, provider_account_id, 
                access_token, refresh_token, expires_at, token_type, scope, id_token
              )
              VALUES (
                ${dbUser.id}, ${account.type}, ${account.provider}, ${account.providerAccountId},
                ${account.access_token}, ${account.refresh_token}, ${account.expires_at}, 
                ${account.token_type}, ${account.scope}, ${account.id_token}
              )
            `;
          }
          return true;
        } catch (error) {
          console.error("Error saving user/account:", error);
          return false;
        }
      }
      return true; // For credentials, authorize already checked
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          // Fetch the database ID for Google users
          const dbUsers = await sql`SELECT id FROM users WHERE email = ${user.email}`;
          if (dbUsers.length > 0) {
            token.id = dbUsers[0].id;
          }
        } else {
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
