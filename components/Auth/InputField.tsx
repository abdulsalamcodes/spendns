import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  title: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      title,
      value,
      onChange,
      placeholder,
      type = "text",
      error,
      helperText,
      required,
      disabled,
      startIcon,
      endIcon,
      containerClassName = "",
      inputClassName = "",
      labelClassName = "",
      id,
      min,
      max,
      step,
      pattern,
      ...restProps
    },
    ref
  ) => {
    // Generate a stable ID for input-label association
    const inputId = id || `input-${title.toLowerCase().replace(/\s+/g, "-")}`;

    const baseInputClassName = `
    flex-1
    text-sm
    h-12
    px-4
    w-full
    bg-indigo-50
    mt-2
    mb-1
    rounded
    transition-all
    duration-200
    peer
    ${startIcon ? "pl-10" : ""}
    ${endIcon ? "pr-10" : ""}
    ${
      error
        ? "border-2 border-red-300 focus:border-red-500 focus:ring-red-200"
        : "focus:ring-2 focus:ring-indigo-200 focus:outline-none"
    }
    ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""}
  `;

    const baseLabelClassName = `
    block
    font-semibold
    text-sm
    mb-1
    ${error ? "text-red-600" : "text-indigo-800"}
    ${disabled ? "opacity-75" : ""}
  `;

    return (
      <div className={`relative mb-4 ${containerClassName}`}>
        <label
          htmlFor={inputId}
          className={`${baseLabelClassName} ${labelClassName}`}
        >
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error || helperText ? `${inputId}-description` : undefined
            }
            className={`${baseInputClassName} ${inputClassName}`}
            {...restProps}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div
            id={`${inputId}-description`}
            className={`text-xs mt-1 ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
