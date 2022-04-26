/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../contexts/AuthContext";
import Loader from "../components/UI/Loader";

const WithAuth = (Component) => (props) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const renderPage = () => (
    <>
      <Component {...props} />
    </>
  );

  const renderLoader = () => <Loader />;

  if (typeof window === "undefined" || loading) {
    return renderLoader();
  }

  return renderPage();
};

export default WithAuth;
