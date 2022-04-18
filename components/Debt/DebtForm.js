import { useContext, useState } from "react";
import MainContext from "../../contexts/MainContext";
import useFormFields from "../../hooks/useFormFields";
import InputField from "../Auth/InputField";

const DebtForm = ({ closeAction }) => {
  const initialValue = {
    personInvolved: "",
    amount: 2000,
    dateAdded: new Date(),
    settled: false,
  };
  const [owedByMe, setOwedByMe] = useState(false);
  const toggleClass = " transform translate-x-6";
  const { formFields, createChangeHandler } = useFormFields(initialValue);
  const { addDebt } = useContext(MainContext);

  const submitForm = () => {
    addDebt({ ...formFields, owedByMe });
    closeAction();
  };

  const SwitchInput = () => (
    <div className="mt-4 mb-2 flex items-center ">
      <div className="font-semibold text-indigo-800 text-sm mr-2">
        Owed By Me:
      </div>
      <div
        className="md:w-14 md:h-8 w-12 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer"
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
    </div>
  );

  return (
    <div
      className="inline-block align-center p-4 pt-5 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <h3 className="text-center font-bold text-xl text-indigo-900">
        Add New Debt
      </h3>
      <main>
        <SwitchInput />

        <InputField
          title={!owedByMe ? "Owed By:" : "Owed To:"}
          value={formFields.personInvolved}
          onChange={createChangeHandler("personInvolved")}
          placeholder="Enter the name of the person owing you"
        />

        <InputField
          type="number"
          title="Amount"
          value={formFields.amount}
          onChange={createChangeHandler("amount")}
          placeholder="Enter the amount owed"
        />
      </main>
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
          <i className="fas fa-plus" /> Add Debt
        </button>
      </div>
    </div>
  );
};

export default DebtForm;
