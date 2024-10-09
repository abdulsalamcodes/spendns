import { useState } from "react";
import useFormFields from "../hooks/useFormFields";
import InputField from "./Auth/InputField";
import Button from "./UI/Button";
import { modalWrapperStyle } from "./commonStyles";
import { v4 as uuidv4 } from "uuid";

const DebtForm = ({ closeAction, submitHandler, detail }) => {
  const initialValue = detail || {
    id: uuidv4(),
    note: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    category: "",
    personInvolved: "",
    settled: false,
  };

  const [owedByMe, setOwedByMe] = useState(detail?.owedByMe || false);
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const toggleClass = "transform translate-x-6";

  const debtCategories = [
    "Personal Loan",
    "Business",
    "Family",
    "Friends",
    "Emergency",
    "Other",
  ];

  const submitForm = () => {
    submitHandler({
      ...formFields,
      owedByMe,
      settled: false,
    });
    closeAction();
  };

  const SwitchInput = () => (
    <div className="mb-4 flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Debt Type
      </label>
      <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
        <span
          className={`text-sm mr-2 ${
            !owedByMe ? "font-semibold text-green-600" : "text-gray-500"
          }`}
        >
          Owed To Me
        </span>
        <div
          className={`w-14 h-7 flex items-center ${
            !owedByMe ? "bg-green-300" : "bg-red-300"
          } rounded-full p-1 cursor-pointer transition-colors duration-300`}
          onClick={() => setOwedByMe(!owedByMe)}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
              !owedByMe ? null : toggleClass
            }`}
          ></div>
        </div>
        <span
          className={`text-sm ml-2 ${
            owedByMe ? "font-semibold text-red-600" : "text-gray-500"
          }`}
        >
          I Owe
        </span>
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
      <header className="border-b pb-4">
        <h3 className="text-center font-bold text-xl text-indigo-900">
          {detail ? "Update Debt" : "Add New Debt"}
        </h3>
      </header>

      <main className="bg-white pt-5 pb-4 p-3 space-y-4">
        <SwitchInput />

        <InputField
          title={owedByMe ? "Owed To:" : "Owed By:"}
          value={formFields.personInvolved}
          onChange={createChangeHandler("personInvolved")}
          placeholder={`Enter the name of the person ${
            owedByMe ? "you owe" : "who owes you"
          }`}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="number"
            title="Amount (₦)"
            value={formFields.amount}
            onChange={createChangeHandler("amount")}
            placeholder="Enter the amount"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formFields.category}
              onChange={createChangeHandler("category")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {debtCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="date"
            title="Date Incurred"
            value={formFields.date}
            onChange={createChangeHandler("date")}
          />

          <InputField
            type="date"
            title="Due Date"
            value={formFields.dueDate}
            onChange={createChangeHandler("dueDate")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            rows="3"
            value={formFields.note}
            onChange={createChangeHandler("note")}
            placeholder="Add any additional details about this debt"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </main>

      <footer className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end space-x-2">
        <Button variant="base" onClick={closeAction}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {detail ? "Update" : "Add"} Debt
        </Button>
      </footer>
    </section>
  );
};

export default DebtForm;
