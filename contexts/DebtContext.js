import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toast";
import { db } from "../firebase";
import AuthContext from "./AuthContext";

const DebtContext = createContext();

export const DebtContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [debts, setDebts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loadingData, setLoading] = useState(false);

  const addDebt = async (debt) => {
    const newDebtRef = doc(db, "users", user?.id);
    await updateDoc(newDebtRef, {
      debts: arrayUnion(debt),
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
    const newDebtRef = doc(db, "users", user?.id);
    await updateDoc(newDebtRef, {
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
    const newDebtRef = doc(db, "users", user?.id);
    await updateDoc(newDebtRef, {
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
    console.log("update on snapshot, loading...");
    setLoading(true);
    let newDebtRef = doc(db, "users", user?.uid);
    return onSnapshot(newDebtRef, (doc) => {
      console.log("update on snapshot, loaded.");
      setLoading(false);
      setIncomes(doc.data().incomes);
      setDebts(doc.data().debts);
      setExpenses(doc.data().expenses);
    });

  }, [user])


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
  return <DebtContext.Provider value={value}>{children}</DebtContext.Provider>;
};

export default DebtContext;
