import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AuthPage from "../components/Auth/AuthPage";
import Loader from "../components/UI/Loader";
import AuthContext from "../contexts/AuthContext";
import { auth } from "../firebase";

const login = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log("login", auth.currentUser, user);
    if (user) {
      router.replace("/");
      console.log("login", auth.currentUser);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Spendns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? <Loader /> : <AuthPage />}
    </>
  );
};

export default login;