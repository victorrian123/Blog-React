import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  const [cancelled, setcancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }
  //Register
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;
    } catch (error) {
      //   console.log(error.message);
      //   console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres!";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail ja cadastrado!";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //Logout - sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //Login - sign in
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuario nao encontrado!";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha Incorreta! Digite novamente";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setcancelled(true);
  }, []);
  return { auth, createUser, error, loading, logout, login };
};
