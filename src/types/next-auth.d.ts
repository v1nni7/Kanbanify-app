import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      email: string;
      username: string;
      profilePicture: string
    };
  }
}
