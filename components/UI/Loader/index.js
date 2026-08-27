import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
