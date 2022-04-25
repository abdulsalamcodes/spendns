import moment from "moment";
import React, { useContext } from "react";
import MainContext from "../contexts/MainContext";
import { modalWrapperStyle } from "./commonStyles";
import Button from "./UI/Button";

const ViewItemModal = ({ icon, detail, onClose, deleteAction, tag }) => {
  const tags = {
    income: "bg-green-100",
    expense: "bg-red-100",
    debt: "bg-purple-100",
  };
  const { update, debts } = useContext(MainContext);
  return (
    <div className={`${modalWrapperStyle} mx-6 p-8 `}>
      <header className="flex items-center gap-3">
        {/* <h3 className="text-center text-xl font-bold mb-4 ">Income Detail</h3> */}
        <div className="h-24 w-24 text-indigo-800 mb-3 bg-indigo-50 rounded-full ali place-content-center grid">
          {icon}
        </div>
        <div>
          <h2 className="md:text-4xl text-3xl font-bold mb-1">{`₦${Number(
            detail?.amount
          ).toLocaleString()}`}</h2>
          <p className="text-gray-400 md:text-lg text-sm">{`Created on: ${moment(
            detail?.date.toDate()
          ).format("DD/MM/YYYY")}`}</p>
          <p className={`text-gray-700 text-xs ${tags[tag]} p-1 px-2 w-max`}>
            {tag}
          </p>
        </div>
      </header>
      <main className="mt-5">
        {tag === "debt" ? (
          <div>
            <h4 className="mb-1 text-lg font-bold">Summary:</h4>
            {!detail.owedByMe ? (
              <div className="mb-5 w-100">{`${detail.personInvolved} owes me ${detail.amount}`}</div>
            ) : (
              <div className="mb-5 w-100">{`I owe ${detail.personInvolved} ${detail.amount}`}</div>
            )}
          </div>
        ) : (
          ""
        )}
        <div>
          <h4 className="mb-1 text-lg font-bold">Attached Note:</h4>
          <div className="mb-5 w-100">{detail.note}</div>
        </div>
      </main>

      <div className="flex items-center grid grid-cols-2 ">
        <Button onClick={onClose} variant="base">
          Cancel
        </Button>
        {tag === "debt" ? (
          <Button
            onClick={() => {
              update({ ...detail, settled: true }, debts, "debt");
              onClose();
            }}
            variant="primary"
          >
            Mark As Cleared.
          </Button>
        ) : (
          <Button
            onClick={() => {
              deleteAction(detail);
              onClose();
            }}
            variant="danger"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewItemModal;
