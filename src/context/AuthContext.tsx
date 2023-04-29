"use client";

import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { getUserRequest, signInRequest } from "@/services/user";
import { api } from "@/services/api";

export const AuthContext = createContext({} as any);

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  email: string;
  password: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
};

type SignInRequestResponse = {
  token: string;
  user: User;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signIn = async ({ email, password }: User) => {
    const { token }: SignInRequestResponse = await signInRequest({ email, password });

    if (!token) return;

    setCookie(undefined, "kanban.token", token, {
      maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    console.log("loading...")
    await loadingUser();

    setIsAuthenticated(true);

    console.log("pushing...")
    router.push("/");
    console.log("pushed")

    return;
  };

  const loadingUser = async () => {
    try {
      const user = await getUserRequest();

      setUser(user);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
