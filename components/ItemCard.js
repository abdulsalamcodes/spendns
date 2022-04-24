import moment from "moment";
import React, { useContext, useState } from "react";
import MainContext from "../contexts/MainContext";
import Form from "./Form";
import { ArrowDown, ArrowUp, DebtIcon, DebtSvgIcon } from "./Icons";
import Modal from "./UI/Modal";
import ViewItemModal from "./ViewItemModal";

const ItemCard = ({ detail, itemType }) => {
  const [activeModal, setActiveModal] = useState("");
  const { deleteExpense, deleteIncome, deleteDebt, updateDebt } =
    useContext(MainContext);
  const closeAction = () => setActiveModal("");
  const props = {
    income: {
      amount: " text-green-700",
      sign: "+",
      icon: <ArrowDown />,
      deleteAction: deleteIncome,
      form: <Form closeAction={closeAction} type="income" detail={detail} />,
      subText: `Created on: ${moment(detail?.date.toDate()).format(
        "DD/MM/YYYY"
      )}`,
    },
    expense: {
      amount: `text-pink-400`,
      sign: "-",
      deleteAction: deleteExpense,
      icon: <ArrowUp />,
      form: <Form closeAction={closeAction} type="expense" detail={detail} />,
      subText: `Created on: ${moment(detail?.date.toDate()).format(
        "DD/MM/YYYY"
      )}`,
    },
    debt: {
      amount: `text-gray-500`,
      sign: "",
      deleteAction: deleteDebt,
      icon: <DebtSvgIcon />,
      form: (
        <Form
          closeAction={closeAction}
          type="debt"
          detail={detail}
          submitHandler={updateDebt}
        />
      ),
      subText: `${detail.owedByMe ? "Owed To: " : "Owed By: "} ${
        detail.personInvolved
      }`,
    },
  };

  const subText = () => {};

  const Item = props[itemType];
  return (
    <>
      <div className="mb-5 flex md:items-center sm:flex-row flex-col  justify-between text-white p-5 shadow-violet-100 bg-indigo-50 rounded-lg">
        <div className="flex align-center gap-2 items-center">
          <div className="h-12 w-12 text-indigo-700 bg-white rounded-full place-content-center grid">
            {Item.icon}
          </div>
          <div>
            <p className={`md:text-2xl text-xl font-bold ${Item.amount}`}>
              {Item.sign} &#8358; {detail?.amount}
            </p>
            <p className="text-sm text-indigo-600 capitalize">{Item.subText}</p>
          </div>
        </div>

        <div className="flex sm:mt-0 mt-5 ">
          <button
            onClick={() => setActiveModal("edit")}
            className="text-sm mr-3 flex-1 justify-center flex p-3 font-bold bg-white rounded-md text-gray-900"
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
            className="text-sm p-3 flex-1 justify-center border-solid border-2 border-indigo-500 font-bold bg-white flex rounded-md font-bold text-gray-900"
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
        Component={
          <ViewItemModal
            onClose={closeAction}
            deleteAction={Item.deleteAction}
            detail={detail}
            icon={Item.icon}
          />
        }
        isOpen={activeModal === "view"}
      />
      <Modal
        closeAction={() => setActiveModal("")}
        Component={Item.form}
        isOpen={activeModal === "edit"}
      />
    </>
  );
};

export default ItemCard;
