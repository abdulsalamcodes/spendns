import { ToastContainer } from "react-toast";

import { AuthContextProvider } from "../contexts/AuthContext";
import { DebtContextProvider } from "../contexts/DebtContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <DebtContextProvider>
          <Component {...pageProps} />
          <ToastContainer position="bottom-center" delay={3000} />
        </DebtContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
