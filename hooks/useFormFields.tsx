import { useState, ChangeEvent, useCallback } from "react";

type FieldValue = string | number | boolean | Date;

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: FieldValue) => boolean;
  errorMessage?: string;
}

interface FieldConfig {
  value: FieldValue;
  validation?: ValidationRule;
}

type FormConfig<T> = {
  [K in keyof T]: T[K] extends object ? FormConfig<T[K]> : FieldConfig | T[K];
};

interface FieldError {
  message: string;
  type: string;
}

type FormErrors<T> = {
  [K in keyof T]?: T[K] extends object ? FormErrors<T[K]> : FieldError;
};

export interface UseFormFieldsReturn<T> {
  formFields: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  setFormFields: (fields: T | ((prev: T) => T)) => void;
  createChangeHandler: (
    key: keyof T
  ) => (e: ChangeEvent<HTMLInputElement> | FieldValue) => void;
  resetForm: () => void;
  validateField: (key: keyof T) => boolean;
  validateForm: () => boolean;
  setFieldValue: (key: keyof T, value: FieldValue) => void;
  setFieldTouched: (key: keyof T, isTouched?: boolean) => void;
  clearErrors: () => void;
  isDirty: boolean;
}

function useFormFields<T extends Record<string, FieldValue>>(
  initialValues: T,
  validationConfig?: FormConfig<T>
): UseFormFieldsReturn<T> {
  const [formFields, setFormFields] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [initialFormState] = useState(initialValues);

  // Validate a single field
  const validateField = useCallback(
    (key: keyof T): boolean => {
      const value = formFields[key];
      const fieldConfig = validationConfig?.[key];
      const rules =
        typeof fieldConfig === "object" && "validation" in fieldConfig
          ? fieldConfig.validation
          : undefined;

      if (!rules) return true;

      let isValid = true;
      let error: FieldError | undefined;

      if (rules.required && !value) {
        isValid = false;
        error = {
          type: "required",
          message: rules.errorMessage || "This field is required",
        };
      } else if (
        rules.minLength &&
        typeof value === "string" &&
        value.length < rules.minLength
      ) {
        isValid = false;
        error = {
          type: "minLength",
          message:
            rules.errorMessage ||
            `Minimum length is ${rules.minLength} characters`,
        };
      } else if (
        rules.maxLength &&
        typeof value === "string" &&
        value.length > rules.maxLength
      ) {
        isValid = false;
        error = {
          type: "maxLength",
          message:
            rules.errorMessage ||
            `Maximum length is ${rules.maxLength} characters`,
        };
      } else if (rules.min && typeof value === "number" && value < rules.min) {
        isValid = false;
        error = {
          type: "min",
          message: rules.errorMessage || `Minimum value is ${rules.min}`,
        };
      } else if (rules.max && typeof value === "number" && value > rules.max) {
        isValid = false;
        error = {
          type: "max",
          message: rules.errorMessage || `Maximum value is ${rules.max}`,
        };
      } else if (
        rules.pattern &&
        typeof value === "string" &&
        !rules.pattern.test(value)
      ) {
        isValid = false;
        error = {
          type: "pattern",
          message: rules.errorMessage || "Invalid format",
        };
      } else if (rules.custom && !rules.custom(value)) {
        isValid = false;
        error = {
          type: "custom",
          message: rules.errorMessage || "Invalid value",
        };
      }

      setErrors((prev) => ({
        ...prev,
        [key]: error,
      }));

      return isValid;
    },
    [formFields, validationConfig]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const validationResults = Object.keys(formFields).map((key) =>
      validateField(key as keyof T)
    );
    return validationResults.every(Boolean);
  }, [formFields, validateField]);

  // Create change handler for a field
  const createChangeHandler = useCallback(
    (key: keyof T) => (e: ChangeEvent<HTMLInputElement> | FieldValue) => {
      const value =
        e && typeof e === "object" && "target" in e ? e.target.value : e;

      setFormFields((prev) => ({
        ...prev,
        [key]: value,
      }));

      setTouched((prev) => ({
        ...prev,
        [key]: true,
      }));

      if (validationConfig?.[key]) {
        validateField(key);
      }
    },
    [validateField, validationConfig]
  );

  // Set a field value directly
  const setFieldValue = useCallback(
    (key: keyof T, value: FieldValue) => {
      setFormFields((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (validationConfig?.[key]) {
        validateField(key);
      }
    },
    [validateField, validationConfig]
  );

  // Set a field's touched state
  const setFieldTouched = useCallback(
    (key: keyof T, isTouched = true) => {
      setTouched((prev) => ({
        ...prev,
        [key]: isTouched,
      }));

      if (isTouched && validationConfig?.[key]) {
        validateField(key);
      }
    },
    [validateField, validationConfig]
  );

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setFormFields(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Check if form is dirty (values changed from initial state)
  const isDirty =
    JSON.stringify(formFields) !== JSON.stringify(initialFormState);

  return {
    formFields,
    errors,
    touched,
    setFormFields,
    createChangeHandler,
    resetForm,
    validateField,
    validateForm,
    setFieldValue,
    setFieldTouched,
    clearErrors,
    isDirty,
  };
}

export default useFormFields;
