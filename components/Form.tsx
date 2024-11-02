import React, { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import useFormFields from "../hooks/useFormFields";
import Button from "./UI/Button";
import { modalWrapperStyle } from "./commonStyles";
import InputField from "./Auth/InputField";

interface FormFields extends Record<string, any> {
  id: string;
  note: string;
  amount: number;
  date: Date;
  personInvolved?: string;
  settled?: boolean;
  owedByMe?: boolean;
}

type FormType = "income" | "expense" | "debt";

interface FormProps {
  closeAction: () => void;
  submitHandler: (
    formData: FormFields,
    items: FormFields[],
    type: FormType
  ) => void;
  type: FormType;
  all?: boolean;
  setType?: (type: FormType) => void;
  detail?: FormFields;
  items: FormFields[];
}

const INITIAL_FORM_STATE: FormFields = {
  id: uuidv4(),
  note: "",
  amount: 0,
  date: new Date(),
  personInvolved: "",
  settled: false,
  owedByMe: false,
};

const Form = ({
  closeAction,
  submitHandler,
  type,
  all = false,
  setType,
  detail,
  items,
}: FormProps) => {
  const [owedByMe, setOwedByMe] = useState(detail?.owedByMe ?? false);

  const { formFields, createChangeHandler } = useFormFields<FormFields>(
    detail || INITIAL_FORM_STATE
  );

  const handleSubmit = () => {
    const submissionData =
      type === "debt"
        ? {
            ...formFields,
            owedByMe,
            settled: false,
          }
        : formFields;

    submitHandler(submissionData, items, type);
    closeAction();
  };

  const TypeSelector = () => (
    <div className="flex items-center gap-2 mt-4">
      {(["income", "expense", "debt"] as const).map((buttonType) => (
        <Button
          key={buttonType}
          onClick={() => setType?.(buttonType)}
          variant={type === buttonType ? "primary" : "base"}
        >
          {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
        </Button>
      ))}
    </div>
  );

  const OwedByMeToggle = () => (
    <div className="mt-4 mb-2 flex items-center max-w-xs w-11/12">
      <span className="font-semibold text-indigo-800 text-sm mr-2">
        Owed To Me:
      </span>
      <button
        type="button"
        className={`md:w-14 md:h-8 w-12 flex items-center ${
          owedByMe ? "bg-indigo-200" : "bg-gray-200"
        } rounded-full p-1 cursor-pointer transition-colors duration-200`}
        onClick={() => setOwedByMe(!owedByMe)}
        aria-pressed={owedByMe}
        aria-label="Toggle owed by me"
      >
        <div
          className={`
            md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md
            transform duration-300 ease-in-out
            ${owedByMe ? "translate-x-6 bg-indigo-500" : "bg-gray-200"}
          `}
        />
      </button>
      <span className="font-semibold text-indigo-800 text-sm ml-2">
        Owed By Me:
      </span>
    </div>
  );

  return (
    <section
      className={modalWrapperStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <header className="mb-4">
        <h3 className="text-center font-bold text-xl text-indigo-900 capitalize">
          {`${detail ? "Update" : "Add New"} ${type}`}
        </h3>
      </header>

      {all && <TypeSelector />}

      <main className="bg-white pt-5 pb-4 p-3">
        {type === "debt" && (
          <>
            <OwedByMeToggle />
            <InputField
              title={owedByMe ? "Owed To:" : "Owed By:"}
              value={formFields.personInvolved}
              onChange={createChangeHandler("personInvolved")}
              placeholder="Enter the name of the person"
            />
          </>
        )}

        <InputField
          type="number"
          title="Amount"
          value={formFields.amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            createChangeHandler("amount")(e.target.value)
          }
          placeholder="Enter the amount"
          min={0}
          step={0.01}
        />

        <InputField
          title="Text/Note:"
          value={formFields.note}
          onChange={createChangeHandler("note")}
          placeholder={`Add some text/notes about this ${type}`}
        />
      </main>

      <footer className="px-4 py-3 text-right text-sm">
        <Button variant="base" onClick={closeAction}>
          <i className="fas fa-times" /> Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          <i className="fas fa-plus" /> {`${detail ? "Update" : "Add"} ${type}`}
        </Button>
      </footer>
    </section>
  );
};

export default Form;
