import moment from "moment";
import React from "react";
import { modalWrapperStyle } from "./commonStyles";
import Button from "./UI/Button";

const ViewItemModal = ({ icon, detail, onClick }) => {
  return (
    <div className={`${modalWrapperStyle} mx-6 p-8 `}>
      <header className="flex items-center gap-3">
        {/* <h3 className="text-center text-xl font-bold mb-4 ">Income Detail</h3> */}
        <div className="h-24 w-24 text-indigo-800 mb-3 bg-indigo-50 rounded-full ali place-content-center grid">
          {icon}
        </div>
        <div>
          <h2 className="md:text-4xl text-3xl font-bold mb-1">{`₦${detail.amount}`}</h2>
          <p className="text-gray-400 md:text-lg text-sm">{`Created on: ${moment(
            detail?.date.toDate()
          ).format("DD/MM/YYYY")}`}</p>
        </div>
      </header>
      <main className="mt-5">
        <div>
          <h4 className="mb-1 text-lg font-bold">Attached Note:</h4>
          <div className="mb-5 w-100">{detail.note}</div>
        </div>
      </main>

      <div className="flex items-center grid grid-cols-2 ">
        <Button onClick={onClick} variant="danger">
          Delete
        </Button>
        <Button onClick={onClick} variant="primary">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewItemModal;
