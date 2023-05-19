import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { supabase } from "@/lib/supabase";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "supabase-email",
      name: "Sign in with email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        return await supabase.auth
          .signInWithPassword(credentials)
          .then(({ data: { user, session } }) => {
            if (user == null) return null;
            return {
              id: user.id,
              email: user.email,
            };
          })
          .catch(() => {
            console.error("invalid credentials");
            return null;
          });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret != null) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.id,
          email: token.email,
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
        session.user.id = token.id;
      }
      // console.log("new session", session);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.id = token.sub!;
      return token;
    },
  },
};

export default NextAuth(authOptions);
