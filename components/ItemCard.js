import moment from "moment";
import React, { useState } from "react";
import ExpenseForm from "./Expenses/ExpenseForm";
import { ArrowDown, ArrowUp } from "./Icons";
import IncomeForm from "./Income/IncomeForm";
import Modal from "./UI/Modal";
import ViewItemModal from "./ViewItemModal";

const ItemCard = ({ detail, expense }) => {
  const props = {
    amount: `text-xl font-bold ${
      !expense ? "text-green-700" : "text-pink-400"
    }`,
    sign: expense ? "-" : "+",
    icon: expense ? <ArrowUp /> : <ArrowDown />,
    form: expense ? (
      <ExpenseForm closeAction={() => setOpen(false)} />
    ) : (
      <IncomeForm closeAction={() => setOpen(false)} />
    ),
  };
  const [activeModal, setActiveModal] = useState("");

  return (
    <>
      <div className="mb-5 flex items-center sm:flex-row flex-col  justify-between text-white p-5 shadow-violet-100 bg-indigo-50 rounded-lg">
        <div className="flex align-center gap-2 items-center">
          <div className="h-12 w-12 bg-gradient-to-r from-violet-400 to-fuchsia-300 rounded-full place-content-center grid">
            {props.icon}
          </div>
          <div>
            <p className={props.amount}>
              {props.sign} &#8358; {detail?.amount}
            </p>
            <p className="text-xs text-indigo-600 capitalize">
              Created on: {moment(detail?.date.toDate()).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>

        <div className="flex sm:mt-0 mt-5">
          <button
            onClick={() => setActiveModal("edit")}
            className="text-sm mr-3 flex p-3 font-bold bg-white rounded-md text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setActiveModal("view")}
            className="text-sm p-3 font-bold bg-white flex rounded-md font-bold text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            View
          </button>
        </div>
      </div>

      <Modal
        closeAction={() => setActiveModal("")}
        Component={<ViewItemModal detail={detail} icon={props.icon} />}
        isOpen={activeModal === "view"}
      />
      <Modal
        closeAction={() => setActiveModal("")}
        Component={props.form}
        isOpen={activeModal === "edit"}
      />
    </>
  );
};

export default ItemCard;
