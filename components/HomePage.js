/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Dropdown from "./Dropdown";
import { PlusIcon, UserIcon } from "./Icons";
import ItemCard from "./ItemCard";
import MainContext from "../contexts/MainContext";
import Modal from "./UI/Modal";
import Form from "./Form";
import DebtChart from "./Charts.js/HomeChart";

const SectionHeader = ({ title, path }) => (
  <header className="flex align-center justify-between mb-4">
    <h4 className="text-gray-700">{title}</h4>
    <Link href={path}>
      <a className="text-sm text-indigo-700 flex items-center">
        <span className="mr-2 underline">See All</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </a>
    </Link>
  </header>
);

const Home = () => {
  const user = useContext(AuthContext).user;
  const { debts, total, addDebt, monthFilter, setMonthFilter } =
    useContext(MainContext);
  const [show, setShow] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].slice(0, new Date().getMonth() + 1);

  return (
    <div className="max-w-6xl m-auto relative">
      {/* header profile */}
      <header className="flex justify-between gap-2 p-4 px-7">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-r from-sky-500 to-indigo-900 rounded-xl place-content-center grid">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h1 className="font-bold text-xl text-indigo-600">DebtTracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShow(true)}
            type="button"
            className="bg-gradient-to-r flex-1 from-indigo-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white p-2 rounded flex gap-2 items-center"
          >
            <PlusIcon size="5" />
            <p style={{ whiteSpace: "nowrap" }}>Add New Debt</p>
          </button>
          <Dropdown />
        </div>
      </header>

      {/* top overview */}
      <section className="mt-5 px-7">
        <div className="min-h-80 p-6 md:p-4 w-full rounded-xl bg-gradient-to-r from-sky-100 shadow-sm to-indigo-100">
          <section className="flex flex-center gap-2">
            <div className="h-12 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full place-content-center grid">
              <UserIcon />
            </div>
            <div>
              <p className="text-xs text-indigo-800">Welcome back👋🏻</p>
              <p className="text-indigo-500 text-lg capitalize">
                {user?.username}
              </p>
            </div>
          </section>
          <div className="md:flex justify-between items-center gap-2">
            <div className="mt-5 md:h-1/2 md:w-1/2 mb-5 md:mb-0 ">
              <DebtChart />
            </div>

            <section className="md:px-8 p-5 md:p-3 md:py-8 bg-white rounded-xl">
              <header className="mb-4">
                <h1 className="text-xl text-gray-700">Debt Overview</h1>
                <p className="text-sm text-gray-600">
                  Your debt summary for {months[monthFilter]}
                </p>
              </header>
              <div className="text-gray-600">
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Total Debt Owed To Me:</p>
                  <p className="font-black underline decoration-green-500">
                    &#8358; {Number(total.debtOwed).toLocaleString()}
                  </p>
                </div>
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Total Debt I Owe:</p>
                  <p className="font-black underline decoration-red-500">
                    &#8358; {Number(total.debtOwedByMe).toLocaleString()}
                  </p>
                </div>
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Net Debt Position:</p>
                  <p
                    className={`font-black underline ${
                      total.debtOwed > total.debtOwedByMe
                        ? "decoration-green-500"
                        : "decoration-red-500"
                    }`}
                  >
                    &#8358;{" "}
                    {Number(
                      total.debtOwed - total.debtOwedByMe
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Recent Debts */}
      <div className="p-7">
        <section className="mb-10">
          <SectionHeader path="/debt" title="Recent Debts Owed To Me" />
          <div>
            {debts.filter((d) => !d.owedByMe).length > 0 ? (
              debts
                .filter((d) => !d.owedByMe)
                .slice(0, 2)
                .map((debt) => (
                  <ItemCard key={debt.id} detail={debt} itemType="debt" />
                ))
            ) : (
              <div className="text-sm text-gray-500 ">
                No one owes you money right now!
              </div>
            )}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeader path="/debt" title="Recent Debts I Owe" />
          <div>
            {debts.filter((d) => d.owedByMe).length > 0 ? (
              debts
                .filter((d) => d.owedByMe)
                .slice(0, 2)
                .map((debt) => (
                  <ItemCard key={debt.id} detail={debt} itemType="debt" />
                ))
            ) : (
              <div className="text-sm text-gray-500 ">
                You don't owe anyone money - great job!
              </div>
            )}
          </div>
        </section>
      </div>

      <Modal
        closeAction={() => setShow(false)}
        Component={
          <Form
            title="Add New Debt"
            btnText="Add Debt"
            type="debt"
            closeAction={() => setShow(false)}
            submitHandler={addDebt}
          />
        }
        isOpen={show}
      />
    </div>
  );
};

export default Home;
