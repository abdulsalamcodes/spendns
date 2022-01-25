import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import Modal from "../UI/Modal";
import DebtForm from "./DebtForm";

const DebtCard = ({ debt }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="to-violet-50 mb-4 from-indigo-50 bg-gradient-to-br p-3 rounded-lg">
        <div className="flex justify-end mb-3">
        <button
          onClick={() => setOpen(true)}
          className="text-gray-500 bg-white p-1 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        </div>
        <div className="flex justify-between items-center text-indigo-900 text-sm mb-1">
          <p>Amount:</p>
          <p className="font-bold">&#8358;{debt.amount}</p>
        </div>
        <hr className="mt-3 mb-3" />
        <div className="flex justify-between items-center text-indigo-900 text-sm mb-1">
          <p>Owed By:</p>
          <p className="font-bold">{debt.owedBy}</p>
        </div>
        <hr className="mt-3 mb-3" />
        <div className="flex justify-between items-center text-indigo-900 text-sm mb-1">
          <p>Date Added:</p>
          <p className="font-bold">{moment(Date(debt.dateOwed)).format('DD/MM/YYYY')}</p>
        </div>
        <hr className="mt-3 mb-3" />

        <div className="flex justify-end gap-2">
          <button className="text-sm text-green-600 hover:drop-shadow-xl hover:scale-105 w-full bg-white py-4 px-5 mt-2 rounded-lg">
            Mark As Cleared.
          </button>
        </div>
      </div>
      <Modal
        closeAction={() => setOpen(false)}
        Component={
          <DebtForm
            btnText="Save"
            title="Edit Debt"
            closeAction={() => setOpen(false)}
          />
        }
        isOpen={open}
      />
    </>
  );
};

export default DebtCard;
