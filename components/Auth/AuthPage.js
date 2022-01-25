import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import useFormFields from "../../hooks/useFormFields";
import InputField from "./InputField";

const LoginPage = () => {
  const initialValue = {
    username: 'abdulsalam',
    email: 'abdulsalamabodunrin369+new@gmail.com',
    password: 'oladeji369'
  }
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const { handleSignUp, loading, formMode, handleLogin, setFormMode } = useContext(AuthContext);

  const formState = {
    login: {
      text: "Login",
      action: () => handleLogin(formFields.email, formFields.password, formFields.username),
      oppositeText: 'Sign Up'
    },
    signup: {
      text: "Sign Up",
      action: () => handleSignUp(formFields.username, formFields.email, formFields.password),
      oppositeText: 'Login'
    },
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-purple-500 md:p-12
    bg-gradient-to-r from-sky-500 to-indigo-500"
    >
      <div className="flex flex-col bg-white rounded shadow-lg  w-80 p-6">
        <h3 className="text-center text-2xl font-bold mb-6 text-indigo-900">
          {formState[formMode].text}
        </h3>
        {formMode === "signup" && (
          <InputField
            title="Username"
            value={formFields.username}
            onChange={createChangeHandler('username')}
            placeholder="Enter Username"
          />
        )}
        <InputField
          title="Email"
          value={formFields.email}
          onChange={createChangeHandler('email')}
          placeholder="Enter email"
        />
        <InputField
          title="Password"
          value={formFields.password}
          onChange={createChangeHandler('password')}
          placeholder="Enter password"
        />
        <button
          onClick={formState[formMode].action}
          className={`flex items-center justify-center h-12 px-6 w-full bg-indigo-500 mt-4 rounded 
          ${loading && 'cursor-progress'} font-semibold text-sm text-indigo-50 hover:bg-indigo-600`}
        >
           {!loading ? formState[formMode].text : 'Loading...'}
        </button>

        <div className="flex mt-6 justify-center text-xs">
          <button
            className="text-indigo-400 hover:text-indigo-500"
            onClick={() => setFormMode("password")}
          >
            Forgot Password
          </button>
          <span className="mx-2 text-gray-300">/</span>
          <button
            className="text-indigo-400 hover:text-indigo-500"
            onClick={() =>
              setFormMode(formMode === "login" ? "signup" : "login")
            }
          >
            {formState[formMode].oppositeText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
