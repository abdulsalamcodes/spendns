import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AuthPage from "../components/Auth/AuthPage";
import Loader from "../components/UI/Loader";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Spendns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthPage />
    </>
  );
};

export default Login;
