import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen overflow-hidden over bg-purple-500
        bg-gradient-to-r from-sky-500 to-indigo-500"
    >
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Loader;
