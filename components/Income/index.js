import Link from "next/link";
import React, { useContext, useState } from "react";
import { BackIcon, PlusIcon } from "../../components/Icons";
import AuthContext from "../../contexts/AuthContext";
import DebtContext from "../../contexts/DebtContext";
import IncomeChart from "../Charts.js/IncomeChart";
import Modal from "../UI/Modal";
import IncomeCard from "./IncomeCard";
import IncomeForm from "./IncomeForm";

const IncomePage = () => {
  const [open, setOpen] = useState(false);
  const { incomes, loadingData } = useContext(DebtContext);
  const { loading } = useContext(AuthContext);

  return (
    <>
      <div className="p-5">
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
          <div className="min-h-80 p-4 w-full rounded-xl bg-gradient-to-r from-sky-100 to-indigo-100">
            <div className="flex items-center justify-between p-3 gap-5 rounded-xl bg-gray-100">
              <button className="p-2 rounded-md bg-gradient-to-r from-indigo-400 to-violet-400 text-white flex-1">
                Weekly
              </button>
              <button className="p-2 rounded-md bg-gradient-to-r from-indigo-100 to-violet-100 flex-1 ">
                Monthly
              </button>
            </div>
            <IncomeChart />
          </div>
        </section>

        {loading || loadingData ? (
          <p className="text-center text-sm text-gray-600">Loading...</p>
        ) : (
          incomes
            ?.sort(
              (a, b) => parseFloat(b.date.seconds) - parseFloat(a.date.seconds)
            )
            .map((income) => <IncomeCard income={income} />)
        )}
      </div>

      <Modal
        closeAction={() => setOpen(false)}
        Component={<IncomeForm closeAction={() => setOpen(false)} />}
        isOpen={open}
      />
    </>
  );
};

export default IncomePage;
