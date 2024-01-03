import Link from "next/link";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import HomeChart from "./Charts.js/HomeChart";
import Dropdown from "./Dropdown";
import { PlusIcon, UserIcon } from "./Icons";
import ItemCard from "./ItemCard";
import MainContext from "../contexts/MainContext";
import Modal from "./UI/Modal";
import Form from "./Form";

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
      </a>
    </Link>
  </header>
);

const Home = () => {
  const user = useContext(AuthContext).user;
  const {
    debts,
    incomes,
    expenses,
    total,
    addExpense,
    addIncome,
    addDebt,
    monthFilter,
    setMonthFilter,
  } = useContext(MainContext);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("income");
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

  const itemTypes = {
    income: {
      submitHandler: addIncome,
    },
    expense: {
      submitHandler: addExpense,
    },
    debt: {
      submitHandler: addDebt,
    },
  };

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
          {/* <p>Fiachra Şamil</p> */}
          <h1 className="font-bold text-xl text-indigo-600">Spendns</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShow(true)}
            type="button"
            className="bg-gradient-to-r flex-1 from-indigo-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white p-2 rounded flex gap-2 items-center"
          >
            <PlusIcon size="5" />
            <p style={{ whiteSpace: "nowrap" }}>Add New</p>
          </button>
          <Dropdown />
        </div>
      </header>
      {/* top overview */}
      <section className="mt-5 px-7">
        <div className="min-h-80 p-6  md:p-4 w-full rounded-xl bg-gradient-to-r from-sky-100 shadow-sm to-indigo-100">
          <section className="flex flex-center gap-2">
            <div className="h-12 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full place-content-center grid">
              <UserIcon />
            </div>
            <div>
              <p className="text-xs text-indigo-800">Hi, Welcome👋🏻</p>
              <p className="text-indigo-500 text-lg capitalize">
                {user?.username}
              </p>
            </div>

            {/* <div className="ml-auto mr-6">
              <label htmlFor="month" className="text-md mr-3">
                Choose a Month:
              </label>

              <select
                name="months"
                id="month"
                onChange={(e) => setMonthFilter(e.target.value)}
                className="p-2 outline-none cursor-pointer"
              >
                {months.map((month, idx) => (
                  <option
                    className="text-xs"
                    selected={idx === monthFilter}
                    key={month}
                    value={idx}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div> */}
          </section>
          <div className="md:flex justify-between items-center gap-2">
            <div className="mt-5 md:h-1/2 md:w-1/2 mb-5 md:mb-0 ">
              <HomeChart />
            </div>

            <section className="md:px-8 p-5 md:p-3 md:py-8 bg-white rounded-xl">
              <header className="mb-4">
                <h1 className="text-xl text-gray-700">Monthly Overview</h1>
                <p className="text-sm text-gray-600">
                  An overview of your financial activity in{" "}
                  {months[monthFilter]}
                </p>
              </header>
              <div className="text-gray-600">
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Total Income:</p>
                  <p className="font-black underline decoration-sky-500">
                    &#8358;{Number(total.incomes).toLocaleString()}
                  </p>
                </div>
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Total Expenses:</p>
                  <p className="font-black underline decoration-pink-500">
                    &#8358; {Number(total.expenses).toLocaleString()}
                  </p>
                </div>
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Total Debt Owed: To Me:</p>
                  <p className="font-black underline decoration-yellow-500">
                    &#8358; {Number(total.debtOwed).toLocaleString()}
                  </p>
                </div>
                <div className="flex mb-2 justify-between align-center capitalize">
                  <p>Total Debt Owed By Me:</p>
                  <p className="font-black underline decoration-green-300">
                    &#8358; {Number(total.debtOwedByMe).toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      {/* categories */}
      <div className="p-7">
        <section className="mb-10">
          <SectionHeader path="/income" title="Latest Income" />
          <div>
            {incomes.length > 0 ? (
              incomes
                ?.filter((_, i) => i < 2)
                .map((income) => (
                  <ItemCard key={income.id} detail={income} itemType="income" />
                ))
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
                  <ItemCard
                    expense
                    key={expense.id}
                    detail={expense}
                    itemType="expense"
                  />
                ))
            ) : (
              <div className="text-sm text-gray-500">
                Free born, no expenses🚀
              </div>
            )}
          </div>
        </section>
        <section className="mb-10">
          <SectionHeader path="/debt" title="Latest Debts" />
          <main>
            {debts?.length > 0 ? (
              debts
                ?.filter((debt, i) => i < 2)
                .map((debt) => (
                  <ItemCard key={debt.id} detail={debt} itemType="debt" />
                ))
            ) : (
              <div className="text-sm text-gray-500 ">
                You&apos;ve got no worries📿
              </div>
            )}
          </main>
        </section>
      </div>

      <Modal
        closeAction={() => setShow(false)}
        Component={
          <Form
            title={`Add New ${type}`}
            all
            btnText={`Add ${type}`}
            type={type}
            setType={setType}
            closeAction={() => setShow(false)}
            submitHandler={itemTypes[type].submitHandler}
          />
        }
        isOpen={show}
      />
    </div>
  );
};

export default Home;

/*
<FeatureCard
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
/>
 */
