import React from "react";

const InputField = ({ title, value, onChange, placeholder, type = "text" }) => (
  <label className="font-semibold text-indigo-800 text-sm mb-2" htmlFor={title}>
    {title}
    <input
      className="flex items-center peer text-xs h-12 px-4 w-full bg-indigo-50 mt-2 mb-4 rounded focus:outline-none focus:ring-2"
      type={type}
      onChange={onChange}
      value={value}
      name={title.toLowerCase()}
      placeholder={placeholder}
    />
  </label>
);

export default InputField;
