import Link from "next/link";
import React, { useContext, useState } from "react";
import { BackIcon, PlusIcon } from "../../components/Icons";
import AuthContext from "../../contexts/AuthContext";
import MainContext from "../../contexts/MainContext";
import ExpenseChart from "../Charts.js/ExpenseChart";
import OverviewCard from "../Debt/OverviewCard";
import Form from "../Form";
import ItemCard from "../ItemCard";
import Modal from "../UI/Modal";

const ExpensePage = () => {
  const [open, setOpen] = useState(false);
  const { expenses, loadingData, total, addExpense } = useContext(MainContext);
  const { loading } = useContext(AuthContext);

  return (
    <>
      <div className="p-5 max-w-4xl m-auto">
        <div className="flex justify-between ">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="cursor-pointer">
                <BackIcon />
              </a>
            </Link>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-indigo-50 p-3 gap-2 text-sm cursor-pointer hover:bg-indigo-700"
          >
            <PlusIcon />
            <span>Add New Expense</span>
          </button>
        </div>

        <header className="my-5">
          <h3 className="text-xl uppercase font-bold text-gray-600">
            Manage Your Expense
          </h3>
        </header>

        <section className="my-5">
          <OverviewCard
            entryCount={expenses.length}
            totalPrice={total.expenses}
            title="Expenses"
          />
        </section>
        <main>
          <h4 className="mb-4 text-lg">List of your expenses</h4>
          <div>
            {loading || loadingData ? (
              <p className="text-center text-sm text-gray-600">Loading...</p>
            ) : expenses && expenses.length > 0 ? (
              expenses
                .sort(
                  (a, b) =>
                    parseFloat(b.date.seconds) - parseFloat(a.date.seconds)
                )
                .map((expense) => (
                  <ItemCard
                    expense
                    key={expense.id}
                    detail={expense}
                    itemType="expense"
                  />
                ))
            ) : (
              <div className="text-sm text-gray-500 ">
                Free born, no expenses🚀
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        closeAction={() => setOpen(false)}
        Component={
          <Form
            type="expense"
            closeAction={() => setOpen(false)}
            submitHandler={addExpense}
          />
        }
        isOpen={open}
      />
    </>
  );
};

export default ExpensePage;

/**
 * 
 * <div className="min-h-80 p-4 w-full rounded-xl bg-gradient-to-r from-sky-100 to-indigo-100">
            <div className="flex items-center justify-between p-3 gap-5 rounded-xl bg-gray-100">
              <button className="p-2 rounded-md bg-gradient-to-r from-indigo-400 to-violet-400 text-white flex-1">
                Weekly
              </button>
              <button className="p-2 rounded-md bg-gradient-to-r from-indigo-100 to-violet-100 flex-1 ">
                Monthly
              </button>
            </div>
            <ExpenseChart /> 
            
            </div>
 */
