import Link from "next/link";
import React, { useContext, useState } from "react";
import { BackIcon, PlusIcon } from "../../components/Icons";
import AuthContext from "../../contexts/AuthContext";
import MainContext from "../../contexts/MainContext";
import IncomeChart from "../Charts.js/IncomeChart";
import Modal from "../UI/Modal";
import ItemCard from "../ItemCard";
import OverviewCard from "../Debt/OverviewCard";
import Form from "../Form";

const IncomePage = () => {
  const [open, setOpen] = useState(false);
  const { incomes, loadingData, total, addIncome } = useContext(MainContext);
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
            <span>Add New Income</span>
          </button>
        </div>

        <header className="my-5">
          <h3 className="text-xl uppercase font-bold text-gray-600">
            Manage Your Income.
          </h3>
        </header>

        <section className="my-5">
          <OverviewCard
            title="Incomes"
            entryCount={incomes.length}
            totalPrice={total.incomes}
          />
        </section>

        <main>
          <h4 className="mb-4 text-lg">List of your income</h4>

          {loading || loadingData ? (
            <p className="text-center text-sm text-gray-600">Loading...</p>
          ) : incomes?.length > 0 ? (
            incomes
              .sort(
                (a, b) =>
                  parseFloat(b.date.seconds) - parseFloat(a.date.seconds)
              )
              .map((income) => (
                <ItemCard key={income.id} detail={income} itemType="income" />
              ))
          ) : (
            <div className="text-sm text-gray-500 ">
              Go earn some money💵💵, nothing here!
            </div>
          )}
        </main>
      </div>

      <Modal
        closeAction={() => setOpen(false)}
        Component={
          <Form
            title="Add New Income"
            btnText="Add Income"
            closeAction={() => setOpen(false)}
            submitHandler={addIncome}
          />
        }
        isOpen={open}
      />
    </>
  );
};

export default IncomePage;
