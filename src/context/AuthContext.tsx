"use client";

import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useLayoutEffect, useState } from "react";
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
    const { token }: SignInRequestResponse = await signInRequest({
      email,
      password,
    });

    if (!token) return;

    setCookie(undefined, "kanban.token", token, {
      maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    await loadingUser();

    setIsAuthenticated(true);

    router.push("/boards");

    return;
  };

  const loadingUser = async () => {
    try {
      const user = await getUserRequest();

      setUser(user);
      setCookie(undefined, "kanban.user", JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 14, // 14 days
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useLayoutEffect(() => {
    const { "kanban.user": user } = parseCookies();

    if (user) {
      const parsedUser = JSON.parse(user);

      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
