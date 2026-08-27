import React, { createContext, useEffect, useState, useCallback } from "react";
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
import {
  collection,
  query,
  getDocs,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async (currentUser) => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser({ ...userDoc.data(), id: userDoc.id });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUsername = useCallback(
    (displayName) => updateProfile(auth.currentUser, { displayName }),
    []
  );

  const handleLogin = useCallback(async (email, password) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithEmailAndPassword(auth, email, password);
      await fetchUser(response.user);
      router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }, [fetchUser, router]);

  const handleSignUp = useCallback(async (username, email, password, photoUrl = "") => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storedUser = response.user;
      await updateUsername(username);
      const userData = {
        uid: storedUser.uid,
        username: username,
        email: email,
        photoUrl: photoUrl,
        totalDebt: 0,
        totalDebtOwed: 0,
        totalDebtOwedByMe: 0,
        totalIncome: 0,
        totalExpenses: 0,
        debts: [],
        expenses: [],
        incomes: [],
      };
      await setDoc(doc(db, "users", storedUser.uid), userData);
      await fetchUser(storedUser);
      router.push("/");
    } catch (e) {
      setLoading(false);
      console.error("Error during signup: ", e);
      toast.error(e.message);
    }
  }, [fetchUser, updateUsername, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        fetchUser(authenticatedUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchUser]);

  const value = {
    user,
    loading,
    handleSignUp,
    handleLogin,
    fetchUser,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
