import useFormFields from "../hooks/useFormFields";
import InputField from "./Auth/InputField";
import Button from "./UI/Button";
import { modalWrapperStyle } from "./commonStyles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Form = (props) => {
  const { closeAction, submitHandler, type, all, setType, detail, items } =
    props;
  const [owedByMe, setOwedByMe] = useState(false);
  const toggleClass = " transform translate-x-6";
  const initialValue = detail
    ? detail
    : {
        id: uuidv4(),
        note: "",
        amount: "",
        date: new Date(),
      };
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const debtSpecificData = {
    personInvolved: formFields.personInvolved,
    settled: false,
    owedByMe,
  };

  const submitForm = () => {
    submitHandler(
      type === "debt" ? { ...formFields, ...debtSpecificData } : formFields,
      items,
      type
    );
    closeAction();
  };

  const SwitchInput = () => (
    <div className="mt-4 mb-2 flex items-center max-w-xs w-11/12 ">
      <div className="font-semibold text-indigo-800 text-sm mr-2">
        Owed To Me:
      </div>
      <div
        className={`md:w-14 md:h-8 w-12 flex items-center ${
          !owedByMe ? "bg-gray-200" : "bg-indigo-200"
        } rounded-full p-1 cursor-pointer`}
        onClick={() => setOwedByMe(!owedByMe)}
      >
        <div
          className={`${
            !owedByMe ? "bg-gray-200" : "bg-indigo-500"
          } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out ${
            !owedByMe ? null : toggleClass
          }`}
        ></div>
      </div>
      <div className="font-semibold text-indigo-800 text-sm ml-2">
        Owed By Me:
      </div>
    </div>
  );

  return (
    <section
      className={modalWrapperStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <header>
        <h3 className="text-center font-bold text-xl text-indigo-900 capitalize">
          {`${detail ? "Update" : "Add New"} ${type}`}
        </h3>
      </header>
      {all ? (
        <div className="flex items-center gap-2 mt-4">
          <Button
            onClick={() => setType("income")}
            variant={type === "income" ? "primary" : "base"}
          >
            Income
          </Button>
          <Button
            onClick={() => setType("expense")}
            variant={type === "expense" ? "primary" : "base"}
          >
            Expense
          </Button>
          <Button
            onClick={() => setType("debt")}
            variant={type === "debt" ? "primary" : "base"}
          >
            Debt
          </Button>
        </div>
      ) : (
        ""
      )}

      <main className="bg-white pt-5 pb-4 p-3">
        {type === "debt" ? <SwitchInput /> : ""}
        {type === "debt" ? (
          <InputField
            title={!owedByMe ? "Owed By:" : "Owed To:"}
            value={formFields.personInvolved}
            onChange={createChangeHandler("personInvolved")}
            placeholder="Enter the name of the person owing you"
          />
        ) : (
          ""
        )}
        <InputField
          type="number"
          title="Amount"
          value={formFields.amount}
          onChange={createChangeHandler("amount")}
          placeholder="Enter the amount"
        />
        <InputField
          title="Text/Note:"
          value={formFields.note}
          onChange={createChangeHandler("note")}
          placeholder={`Add some text/notes about this ${type}`}
        />
      </main>
      <footer className=" px-4 py-3 text-right text-sm">
        <Button variant="base" onClick={closeAction}>
          <i className="fas fa-times" /> Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          <i className="fas fa-plus" /> {`${detail ? "Update" : "Add"} ${type}`}
        </Button>
      </footer>
    </section>
  );
};

export default Form;
