import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toast";
import { db } from "../firebase";
import AuthContext from "./AuthContext";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [debts, setDebts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loadingData, setLoading] = useState(false);

  const addDebt = async (debt) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      debts: arrayUnion(debt),
      totalDebt: +debt.amount,
    })
      .then(() => {
        toast.success("Successfully added!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  const addIncome = async (debt) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      incomes: arrayUnion(debt),
    })
      .then(() => {
        toast.success("Successfully added!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  const addExpense = async (expense) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      expenses: arrayUnion(expense),
    })
      .then(() => {
        toast.success("Successfully added!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  useEffect(() => {
    // update on snapshot.
    if (!user) return;
    setLoading(true);
    let userRef = doc(db, "users", user?.uid);
    return onSnapshot(userRef, (doc) => {
      if (doc.data()) {
        setIncomes(doc.data().incomes);
        setDebts(doc.data().debts);
        setExpenses(doc.data().expenses);
        console.log("[MainContext", doc.data());
      }
      setLoading(false);
    });
  }, [user]);

  const value = {
    debts,
    setDebts,
    loadingData,
    incomes,
    expenses,
    addDebt,
    addIncome,
    addExpense,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;
