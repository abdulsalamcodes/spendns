/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../contexts/AuthContext";

const WithAuth = (Component) => (props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  const renderPage = () => (
    <>
      <Component {...props} />
    </>
  );

  const renderLoader = () => (
    <div className="main-loader">
      <div className="">Loading...</div>
    </div>
  );

  if (typeof window === "undefined") {
    return renderLoader();
  }

  return renderPage();
};

export default WithAuth;
