import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Container from "../../hoc/Container";
import Modal from "../../components/UI/Modal";
import { BackIcon, PlusIcon } from "../../components/Icons";
import OverviewCard from "./OverviewCard";
import MainContext from "../../contexts/MainContext";
import AuthContext from "../../contexts/AuthContext";
import ItemCard from "../ItemCard";
import Form from "../Form";

const DebtPage = () => {
  const [open, setOpen] = useState(false);
  const { debts, loadingData, total, addDebt } = useContext(MainContext);
  const { loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("All");
  const TabButton = ({ text }) => (
    <button
      onClick={() => setActiveTab(text)}
      className={`${
        activeTab === text && "bg-indigo-500 text-white px-4"
      } items-center flex text-sm cursor-pointer py-2 border-b-1  hover:border-b-violet-600`}
    >
      {text}
    </button>
  );
  return (
    <Container>
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
            <span>Add New Debt</span>
          </button>
        </div>

        <header className="mt-5">
          <h3 className="text-xl uppercase font-bold text-gray-600">
            Manage Your Debt
          </h3>
        </header>

        <section className="sm:flex gap-4 flex-wrap mt-4 ">
          <OverviewCard
            title="OWED"
            peopleCount={5}
            totalPrice={total.debtOwed}
          />
          <OverviewCard
            title="OWING"
            peopleCount={5}
            totalPrice={total.debtOwedByMe}
          />
        </section>

        <section className="mt-10">
          <header className="border-b-2 flex items-end gap-5 w-full mb-3 ">
            <TabButton text="All" />
            <TabButton text="Owe Me" />
            <TabButton text="Owe" />
            <TabButton text="Cleared Debt" />
          </header>

          <main className=" gap-4">
            {loading || loadingData ? (
              <p className="text-center text-sm text-gray-600">Loading...</p>
            ) : !debts.length || debts.length === 0 ? (
              <div className="bg-white font-bold p-4 w-full text-center m-auto shadow-md rounded-lg text-green-500">
                Debt List Empty! 🎉
              </div>
            ) : (
              debts?.map((debt) => (
                <ItemCard key={debt.id} detail={debt} itemType="debt" />
              ))
            )}
          </main>
        </section>
      </div>

      {/* Modals */}
      <Modal
        closeAction={() => setOpen(false)}
        Component={
          <Form
            title="Add New Debt"
            btnText="Add Debt"
            type="debt"
            closeAction={() => setOpen(false)}
            submitHandler={addDebt}
          />
        }
        isOpen={open}
      />
    </Container>
  );
};

export default DebtPage;
