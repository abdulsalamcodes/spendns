import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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
  const currentMonth = new Date().getMonth();
  const [total, setTotal] = useState({
    debtOwedByMe: 0,
    incomes: 0,
    expenses: 0,
    debtOwed: 0,
  });

  // CREATE ITEMS
  const addDebt = async (debt) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      debts: arrayUnion(debt),
      totalDebtOwed: !debt.owedByMe && increment(debt.amount),
      totalDebtOwedByMe: debt.owedByMe && increment(debt.amount),
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
      totalIncome: increment(income.amount),
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
      totalExpenses: increment(expense.amount),
    })
      .then(() => {
        toast.success("Successfully added!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  // DELETE ITEMS
  const deleteDebt = async (debt) => {
    console.log(debt);

    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      debts: arrayRemove(debt),
      totalDebtOwed: !debt.owedByMe && increment(-debt.amount),
      totalDebtOwedByMe: debt.owedByMe && increment(-debt.amount),
    })
      .then(() => {
        toast.success("Successfully deleted!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  const deleteIncome = async (income) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      incomes: arrayRemove(income),
      totalIncome: total.incomes - income.amount,
    })
      .then(() => {
        toast.success("Successfully deleted!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  const deleteExpense = async (expense) => {
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      expenses: arrayRemove(expense),
      totalExpenses: total.expenses - expense.amount,
    })
      .then(() => {
        toast.success("Successfully deleted!");
      })
      .catch((e) => {
        console.log("error", e);
        toast.error("An error occurred.");
      });
  };

  // PATCH ITEM.
  const updateDebt = async (newDebt) => {
    console.log(newDebt);
    const newDebts = debts.map((debt) =>
      debt.id === newDebt.id ? (debt = newDebt) : debt
    );
    const userRef = doc(db, "users", user?.id);
    await updateDoc(userRef, {
      debts: newDebts,
    })
      .then(() => {
        toast.success("Successfully updated!");
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
      incomes: sum(
        incomes.filter((item) => item.date.toDate().getMonth() === currentMonth)
      ),
      debtOwed: sum(
        debts.filter(
          (debt) =>
            !debt.owedByMe && debt.date.toDate().getMonth() === currentMonth
        )
      ),
      debtOwedByMe: sum(
        debts.filter(
          (debt) =>
            debt.owedByMe && debt.date.toDate().getMonth() === currentMonth
        )
      ),
      expenses: sum(
        expenses.filter(
          (item) => item.date.toDate().getMonth() === currentMonth
        )
      ),
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
    deleteExpense,
    deleteIncome,
    deleteDebt,
    updateDebt,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;
