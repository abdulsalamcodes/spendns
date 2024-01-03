import React from "react";

const Button = ({ onClick, children, variant }) => {
  const btnBaseStyle = "py-2 px-4 mx-1 capitalize";
  const btnStyleType = {
    base: "bg-gray-200 text-indigo-900 rounded-md hover:bg-gray-300 ",
    primary: "bg-indigo-600 text-white rounded-md hover:bg-indigo-700",
    danger: "bg-red-600 text-white rounded-md hover:bg-red-700",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={btnBaseStyle + " " + btnStyleType[variant]}
    >
      {children}
    </button>
  );
};

export default Button;
