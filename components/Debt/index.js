import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Container from "../../hoc/Container";
import Modal from "../../components/UI/Modal";
import { BackIcon, PlusIcon } from "../../components/Icons";
import DebtForm from "./DebtForm";
import DebtCard from "./DebtCard";
import OverviewCard from "./OverviewCard";
import DebtContext from "../../contexts/DebtContext";
import AuthContext from "../../contexts/AuthContext";

const DebtPage = () => {
  const [open, setOpen] = useState(false);
  const { debts, loadingData } = useContext(DebtContext);
  const { loading } = useContext(AuthContext);
  const TabButton = ({ text }) => (
    <button className="items-center flex text-sm cursor-pointer pb-3 hover:text-violet-600 border-b-1  hover:border-b-violet-600">
      {text}
    </button>
  );
  return (
    <Container>
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
            <span>Add New Debt</span>
          </button>
        </div>

        <header className="mt-5">
          <h3 className="text-xl uppercase font-bold text-gray-600">
            Manage Your Debt
          </h3>
        </header>

        <section className="sm:flex gap-4 flex-wrap mt-4 ">
          <OverviewCard title="OWE ME" peopleCount={5} totalPrice="50, 000" />
          <OverviewCard title="OWE" peopleCount={5} totalPrice="60, 000" />
        </section>

        <section className="mt-10">
          <header className="border-b-2 flex items-end gap-5 w-full mb-3 ">
            <TabButton text="Owe Me" />
            <TabButton text="Owe" />
            <TabButton text="Cleared Debt" />
          </header>

          {/* {uiDebts?.length > 0 ?
           ( */}
          <main className="grid md:grid-cols-2 gap-4">
            {loading || loadingData ? (
              <p className="text-center text-sm text-gray-600">Loading...</p>
            ) : (
              debts?.map((debt) => <DebtCard debt={debt} />)
            )}
          </main>
          {/* // ) : (
          //   <div className="bg-white font-bold p-4 w-full text-center m-auto shadow-md rounded-lg text-green-500">
          //     Debt List Empty! 🎉
          //   </div>
          // )} */}
        </section>
      </div>

      {/* Modals */}
      <Modal
        closeAction={() => setOpen(false)}
        Component={<DebtForm closeAction={() => setOpen(false)} />}
        isOpen={open}
      />
    </Container>
  );
};

export default DebtPage;
