import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
}

export const AuthContext: any = createContext(null);

const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<AuthContextType | any>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    token: "",
  });

  useEffect(() => {
    const localUser: any = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
