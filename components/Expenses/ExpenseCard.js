import moment from "moment";
import React from "react";
import { UserIcon } from "../Icons";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="mb-5 flex items-center justify-between text-white bg-indigo-50 p-5 rounded-lg">
      <div className="flex align-center gap-2 items-center">
        <div className="h-12 w-12 bg-gradient-to-r from-violet-400 to-fuchsia-300 rounded-full place-content-center grid">
          <UserIcon />
        </div>
        <div>
          <p className="font-bold text-indigo-900 capitalize">{expense.title}</p>
          <p className="text-xs text-indigo-600 capitalize">{expense.category}</p>
        </div>
      </div>

      <div>
          <p className="text-xl font-bold text-pink-400">- &#8358;{expense.amount}</p>
          <p className="text-sm text-right font-bold text-gray-900">{moment(expense.date?.toDate()).format('DD/MM/YYYY')}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
