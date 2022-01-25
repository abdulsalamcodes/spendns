import moment from "moment";
import React from "react";
import { UserIcon } from "../Icons";

const IncomeCard = ({ income }) => {
  return (
    <div className="mb-5 flex items-center justify-between text-white p-5 shadow-violet-100 bg-indigo-50 rounded-lg">
      <div className="flex align-center gap-2 items-center">
        <div className="h-12 w-12 bg-gradient-to-r from-violet-400 to-fuchsia-300 rounded-full place-content-center grid">
          <UserIcon />
        </div>
        <div>
          <p className="font-bold text-indigo-900 capitalize">{income?.title || 'Regular income'}</p>
          <p className="text-xs text-indigo-600 capitalize">{income?.source}</p>
        </div>
      </div>

      <div>
          <p className="text-xl font-bold text-green-700">+ &#8358; {income?.amount}</p>
          <p className="text-sm text-right font-bold text-gray-900">{moment(income?.date.toDate()).format('DD/MM/YYYY')}</p>
      </div>
    </div>
  );
};

export default IncomeCard;
