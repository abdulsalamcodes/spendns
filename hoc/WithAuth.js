import React, { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../contexts/AuthContext";
import Loader from "../components/UI/Loader";

const WithAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    if (typeof window === "undefined") {
      return <Loader />;
    }

    if (loading) {
      return <Loader />;
    }

    if (!user) {
      router.replace("/login");
      return <Loader />;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `WithAuth(${Component.displayName || Component.name || "Component"})`;

  return AuthenticatedComponent;
};

export default WithAuth;
