import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

export const AuthContext: any = createContext(null);

const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<AuthContextType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
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
