import { useState } from "react";

const useFormFields = (initialValues) => {
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (e) => {
    const value = e.target.value;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };
  return { formFields, createChangeHandler };
}

export default useFormFields;
