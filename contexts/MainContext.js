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
  const [total, setTotal] = useState({
    debtOwedByMe: 0,
    incomes: 0,
    expenses: 0,
    debtOwed: 0,
  });

  const addDebt = async (debt) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      debts: arrayUnion(debt),
      totalDebtOwed: !debt.owedByMe && total.debtOwed + debt.amount,
      totalDebtOwedByMe: debt.owedByMe && total.debtOwedByMe + debt.amount,
    })
      .then(() => {
        toast.success("Successfully added!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  const addIncome = async (income) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      incomes: arrayUnion(income),
      totalIncome: total.incomes + income.amount,
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
      totalExpenses: total.expenses + expense.amount,
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
    const sum = (item) =>
      item
        ?.map((el) => el.amount * 1)
        .reduce((a, b) => {
          return a + b;
        }, 0);
    setTotal((prev) => ({
      ...prev,
      incomes: sum(incomes),
      debtOwed: sum(debts.filter((debt) => !debt.owedByMe)),
      debtOwedByMe: sum(debts.filter((debt) => debt.owedByMe)),
      expenses: sum(expenses),
    }));
  }, [incomes, debts, expenses]);

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
    total,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;
