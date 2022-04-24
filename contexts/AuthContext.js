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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUser = async (currentUser) => {
    const q = query(
      collection(db, "users"),
      where("email", "==", currentUser?.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs) {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUser({ ...doc.data(), id: doc.id });
        router.replace("/");
      });
    }
    setLoading(false);
  };

  const getCurrentUser = () => {
    setLoading(true);
    onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        fetchUser(authenticatedUser);
      } else {
        setUser(null);
        setLoading(false);
        auth.signOut();
      }
    });
  };

  const updateUsername = (displayName) =>
    updateProfile(auth.currentUser, { displayName });

  const handleLogin = (email, password) => {
    setLoading(true);
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password).then(() => {
          getCurrentUser();
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleSignUp = async (username, email, password, photoUrl = "") => {
    setLoading(true);
    try {
      setPersistence(auth, browserLocalPersistence);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storedUser = response.user;
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
        fetchUser(storedUser);
      }
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
