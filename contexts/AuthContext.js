import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toast";

import {
  createUserWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, getDocs, where, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [formMode, setFormMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const fetchUser = async (currentUser) => {
    const q = query(collection(db, "users"), where("email", "==", currentUser?.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs) {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUser({ ...doc.data(), id: doc.id });
        setLoading(false);
        console.log(router.pathname)
        if (router.pathname === '/login' || router.pathname === '/') {
          router.replace("/");
        }
      });
    } else {
      setLoading(false);
      toast.error("User does not exist.");
    }
  };

  const getCurrentUser = () => {
    setLoading(true);
    onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        console.log("authenticatedUser", authenticatedUser);
        fetchUser(authenticatedUser);
      } else {
        setUser(null);
        setLoading(false);
        auth.signOut();
      }
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const updateUsername = (displayName) =>
    updateProfile(auth.currentUser, { displayName });

  const handleLogin = (email, password, username) => {
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        setLoading(true);
        updateUsername(username);
        getCurrentUser();
      })

      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleSignUp = async (username, email, password, photoUrl = "") => {
    try {
      setPersistence(auth, browserLocalPersistence);
      const { storedUser } = await createUserWithEmailAndPassword(auth, email, password);
      if (storedUser) {
        setLoading(true);
        await updateUsername(username);
        const userData = {
          uid: storedUser.uid,
          username: username,
          email: email,
          photoUrl: photoUrl,
          totalDebt: 0,
          totalIncome: 0,
          totalExpenses: 0,
          debts: [],
          expenses: [],
          incomes: [],
        };
        await setDoc(doc(db, "users", storedUser.uid), userData);
        getCurrentUser();
      }
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
      toast.error(e);
    }
  };

  const value = {
    user,
    loading,
    handleSignUp,
    handleLogin,
    formMode,
    setFormMode,
    fetchUser,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
