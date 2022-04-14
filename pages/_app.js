import { ToastContainer } from "react-toast";

import { AuthContextProvider } from "../contexts/AuthContext";
import { MainContextProvider } from "../contexts/MainContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <MainContextProvider>
          <Component {...pageProps} />
          <ToastContainer position="bottom-center" delay={3000} />
        </MainContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
