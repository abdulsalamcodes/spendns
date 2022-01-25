import React from "react";

const OverviewCard = ({ title, peopleCount, totalPrice}) => {
  return (
    <div className="p-3 bg-gradient-to-r from-sky-500 to-indigo-500 flex-1 rounded-lg mb-3 sm:mb-0">
      <small className="text-white font-mono font-bold underline underline-offset-4">
        {title}
      </small>
      <div className="flex items-center text-white text-xl md:text-2xl gap-5 mt-2">
        <p className="font-bold">Total Price:</p>
        <p>
          &#8358; {totalPrice} <span className="text-lg bold">({peopleCount} people)</span>
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
        12th December, 2021
      </p>
    </div>
  );
};

export default OverviewCard;
