import moment from "moment";
import React from "react";
import { modalWrapperStyle } from "./commonStyles";
import Button from "./UI/Button";

const ViewItemModal = ({ icon, detail }) => {
  return (
    <div className={`${modalWrapperStyle} p-10`}>
      <header className="text-center flex items-center justify-center flex-col">
        {/* <h3 className="text-center text-xl font-bold mb-4 ">Income Detail</h3> */}
        <div className="h-24 w-24 text-white mb-3 bg-gradient-to-r from-violet-400 to-fuchsia-300 rounded-full ali place-content-center grid">
          {icon}
        </div>
        <h2 className="text-3xl font-bold mb-1">{`₦${detail.amount}`}</h2>
        <p>{`Created on: ${moment(detail?.date.toDate()).format(
          "DD/MM/YYYY"
        )}`}</p>
      </header>
      <main className="mt-5">
        <div>
          <h4 className="mb-1 text-lg font-bold">Attached Note:</h4>
          <div className="mb-5 w-100">{detail.note}</div>
        </div>
      </main>

      <div className="flex items-center justify-end">
        <Button variant="danger">Delete</Button>
        <Button variant="primary">Ok</Button>
      </div>
    </div>
  );
};

export default ViewItemModal;
