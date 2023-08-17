import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
