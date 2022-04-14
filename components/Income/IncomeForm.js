import { FieldValue, Firestore } from "firebase/firestore";
import { useContext, useState } from "react";
import MainContext from "../../contexts/MainContext";
import useFormFields from "../../hooks/useFormFields";
import InputField from "../Auth/InputField";
import { v4 as uuidv4 } from "uuid";
import Button from "../UI/Button";

const IncomeForm = ({ closeAction }) => {
  const initialValue = {
    note: "",
    amount: 2000,
  };
  const date = new Date();
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const { addIncome } = useContext(MainContext);

  const submitForm = () => {
    addIncome({ ...formFields, date });
    closeAction();
  };
  return (
    <div
      className="inline-block align-center p-4 pt-5 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <h3 className="text-center font-bold text-xl text-indigo-900">
        Add New Income
      </h3>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <InputField
          type="number"
          title="Amount"
          value={formFields.amount}
          onChange={createChangeHandler("amount")}
          placeholder="Enter the amount"
        />
        <InputField
          title="Text/Note:"
          value={formFields.notes}
          onChange={createChangeHandler("note")}
          placeholder="Add some text/notes about this income"
        />
      </div>
      <div className=" px-4 py-3 text-right text-sm">
        <Button variant="base" onClick={closeAction}>
          <i className="fas fa-times" /> Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          <i className="fas fa-plus" /> Add Income
        </Button>
      </div>
    </div>
  );
};

export default IncomeForm;
