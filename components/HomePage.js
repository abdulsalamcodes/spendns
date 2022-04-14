import Link from "next/link";
import React, { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import HomeChart from "./Charts.js/HomeChart";
import Dropdown from "./Dropdown";
import {
  DebtIcon,
  ExpenseIcon,
  IncomeIcon,
  nairaSign,
  UserIcon,
} from "./Icons";
import ItemCard from "./ItemCard";
import ExpenseCard from "./Expenses/ExpenseCard";
import DebtCard from "./Debt/DebtCard";
import MainContext from "../contexts/MainContext";

const FeatureCard = ({ title, description, Icon, path }) => (
  <Link href={path}>
    <a className="bg-white rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl mb-4 cursor-pointer block">
      <div>
        <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
          {Icon}
        </span>
      </div>
      <h3 className="text-gray-900 mt-5 text-base font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-gray-500  mt-2 text-sm">
        {description ||
          "The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space."}
      </p>
    </a>
  </Link>
);

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

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg> */}
        {/* <span className="text-2xl">👉</span> */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg> */}
      </a>
    </Link>
  </header>
);

const Home = () => {
  const { user } = useContext(AuthContext);
  const { debts, incomes, expenses } = useContext(MainContext);

  return (
    <main className="max-w-4xl m-auto h-full w-full">
      {/* header profile */}
      <header className="flex justify-between p-4 px-7">
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
          {/* <p>Fiachra Şamil</p> */}
          <h1 className="font-bold text-xl text-indigo-600">Spendns</h1>
        </div>
        <div>
          <Dropdown />
        </div>
      </header>
      {/* top overview */}
      <section className="mt-5 px-7">
        <div className="min-h-80  p-4 w-full rounded-xl bg-gradient-to-r from-sky-100 shadow-sm to-indigo-100">
          <div className="flex flex-center gap-2">
            <div className="h-12 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full place-content-center grid">
              <UserIcon />
            </div>
            <div>
              <p className="text-xs text-indigo-800">Hi, Welcome👋🏻</p>
              <p className="text-indigo-500 text-lg capitalize">
                {user?.username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="mt-5 h-1/2 w-1/2 ">
              <HomeChart />
            </div>

            <section className="md:px-8 md:py-8 bg-indigo-50 rounded-3xl">
              <header className="mb-4">
                <h3 className="text-xl text-indigo-800">Monthly Overview</h3>
                <p className="text-sm text-indigo-700">
                  An overview of your financial activity in this month
                </p>
              </header>
              <div className="text-indigo-800">
                <div className="flex mb-2 justify-between align-center">
                  <p>Total Income:</p>
                  <p>&#8358;2000</p>
                </div>
                <div className="flex mb-2 justify-between align-center">
                  <p>Total Expenses:</p>
                  <p>&#8358;2000</p>
                </div>
                <div className="flex mb-2 justify-between align-center">
                  <p>Total Debts:</p>
                  <p>&#8358;2000</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      {/* categories */}
      <div className="p-7">
        {/* <h3 className="text-gray-900 font-mono text-xl mb-2">Features</h3> */}
        <section className="mb-10">
          <SectionHeader path="/income" title="Latest Income" />
          <div>
            {incomes.length > 0 ? (
              incomes
                ?.filter((_, i) => i < 2)
                .map((income) => <ItemCard key={income.id} detail={income} />)
            ) : (
              <div className="text-sm text-gray-500 ">
                Go earn some money💵💵, nothing here!
              </div>
            )}
          </div>
        </section>
        <section className="mb-10">
          <SectionHeader path="/expenses" title="Latest Expenses" />
          <div>
            {expenses?.length > 0 ? (
              expenses
                ?.filter((_, i) => i < 2)
                .map((expense) => (
                  <ItemCard expense key={expense.id} detail={expense} />
                ))
            ) : (
              <div className="text-sm text-gray-500 ">
                Free born, no expenses🚀
              </div>
            )}
          </div>
        </section>
        <section className="mb-10">
          <SectionHeader path="/debt" title="Latest Debts" />
          <main className="grid md:grid-cols-2 gap-4">
            {debts.length > 0 ? (
              debts
                ?.filter((_, i) => i < 2)
                .map((debt) => <DebtCard key={debt.id} debt={debt} />)
            ) : (
              <div className="text-sm text-gray-500 ">
                You&apos;ve got no worries📿
              </div>
            )}
          </main>
        </section>
      </div>
    </main>
  );
};

export default Home;

{
  /* <FeatureCard
          path="/income"
          title="Track your Income"
          description="Keep track of your sources of income, including your passive incomes, the stats over some period of time and more."
          Icon={<IncomeIcon />}
        />
        <FeatureCard
          path="/expenses"
          title="Manage your expenses"
          description="Keep track of your daily expenses, subscriptions and bills, purchases, monthly overview of expenses and more."
          Icon={<ExpenseIcon />}
        />
        <FeatureCard
          path="/debt"
          title="Manage your debt"
          description="Keep an eye on the debt you owned to others and the ones owned to you. Receive and send notifications for upcoming deadlines."
          Icon={<DebtIcon />}
        /> */
}
