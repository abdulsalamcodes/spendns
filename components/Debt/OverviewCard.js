import moment from "moment";
import React from "react";

const OverviewCard = ({ title, entryCount, totalPrice }) => {
  return (
    <div className="p-3 bg-gradient-to-r from-sky-500 to-indigo-500 flex-1 rounded-xl mb-3 sm:mb-0">
      <small className="text-white font-mono font-bold underline underline-offset-4">
        {title}
      </small>
      <div className="flex items-center justify-between text-white text-xl md:text-xl mt-2">
        <p className="font-bold">{`Total ${title}:`}</p>
        <p>
          &#8358; {Number(totalPrice).toLocaleString()}
          <span className="text-md ml-2 bold">({entryCount} entries)</span>
        </p>
      </div>
      <p className="text-xs text-red-50 mt-2 gap-1 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>{" "}
        {moment(new Date()).format("DD MMMM, YYYY")}
      </p>
    </div>
  );
};

export default OverviewCard;
