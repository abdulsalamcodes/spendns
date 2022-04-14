import { useContext, useState } from "react";
import MainContext from "../../contexts/MainContext";
import useFormFields from "../../hooks/useFormFields";
import InputField from "../Auth/InputField";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";

const ExpenseForm = ({ closeAction }) => {
  const initialValue = {
    note: "",
    amount: "2000",
  };
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const { addExpense } = useContext(MainContext);

  const submitForm = () => {
    addExpense({ ...formFields, date: new Date() });
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
        Add New Expense
      </h3>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <InputField
          type="number"
          title="Amount:"
          value={formFields.amount}
          onChange={createChangeHandler("amount")}
          placeholder="Enter the amount"
        />

        <InputField
          title="Note(Add some notes about this expense):"
          value={formFields.title}
          onChange={createChangeHandler("note")}
          placeholder="Enter some note here to help you remember this expense"
        />

        {/* <label className="font-semibold text-indigo-800 text-sm mb-4">
          Date
        </label>
        <DatePicker onChange={onChange} value={value} /> */}
      </div>
      <div className=" px-4 py-3 text-right text-sm">
        <button
          type="button"
          className="py-3 px-6 bg-gray-200 text-indigo-900 rounded-md hover:bg-gray-300 mr-3"
          onClick={closeAction}
        >
          <i className="fas fa-times" /> Cancel
        </button>
        <button
          type="button"
          onClick={submitForm}
          className="py-3 px-6 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 mr-2"
        >
          <i className="fas fa-plus" /> Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
