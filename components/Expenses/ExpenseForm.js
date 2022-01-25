import { useContext, useState } from "react";
import DebtContext from "../../contexts/DebtContext";
import useFormFields from "../../hooks/useFormFields";
import InputField from "../Auth/InputField";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";

const ExpenseForm = ({
  closeAction,
  title = "Add New Debt",
  btnText = "Add Debt",
}) => {
  const initialValue = {
    title: "",
    category: "Salary",
    amount: "2000",
  };
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const [value, onChange] = useState(new Date());
  const { addExpense } = useContext(DebtContext);

  const submitForm = () => {
    console.log("Adding", {
      ...formFields,
      date: value,
    });
    addExpense({ ...formFields, date: value });
    closeAction();
  };
  return (
    <div
      className="inline-block align-center p-4 pt-5 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <h3 className="text-center font-bold text-xl text-indigo-900">{title}</h3>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <InputField
          title="Title"
          value={formFields.title}
          onChange={createChangeHandler("title")}
          placeholder="Enter the title of the expense"
        />
        <InputField
          title="Category:"
          value={formFields.category}
          onChange={createChangeHandler("category")}
          placeholder="Enter category"
        />
        <InputField
          type="number"
          title="Amount"
          value={formFields.amount}
          onChange={createChangeHandler("amount")}
          placeholder="Enter the amount"
        />

        <label className="font-semibold text-indigo-800 text-sm mb-4">
          Date
        </label>
        <DatePicker onChange={onChange} value={value} />
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
          <i className="fas fa-plus" /> {btnText}
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
