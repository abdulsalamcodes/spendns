import Head from "next/head";
import React, { useContext } from "react";
import AuthPage from "../components/Auth/AuthPage";
import Loader from "../components/UI/Loader";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
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
