import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { User } from "@firebase/auth-types";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface AppContextInterface {
  currentUser: User | undefined;
  signup: Function;
  login: Function;
  logout: Function;
  resetPassword: Function;
}

const AuthContext = React.createContext<AppContextInterface>(undefined!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user!);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AppContextInterface = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
