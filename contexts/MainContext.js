import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toast";
import { db } from "../firebase";
import AuthContext from "./AuthContext";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [debts, setDebts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loadingData, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth());

  const handleFirebaseError = useCallback((error) => {
    console.error("Firebase error:", error);
    toast.error(error.message || "An error occurred.");
  }, []);

  const getUserRef = useCallback(() => {
    if (!user?.uid) {
      return null;
    }
    return doc(db, "users", user.uid);
  }, [user]);

  // CREATE ITEMS
  const addDebt = useCallback(async (debt) => {
    try {
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");
      await updateDoc(userRef, {
        debts: arrayUnion({ ...debt, createdAt: new Date().toISOString() }),
        ...(debt.owedByMe
          ? { totalDebtOwedByMe: increment(debt.amount) }
          : { totalDebtOwed: increment(debt.amount) }),
      });
      toast.success("Debt added successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  const addIncome = useCallback(async (income) => {
    try {
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");
      await updateDoc(userRef, {
        incomes: arrayUnion({ ...income, createdAt: new Date().toISOString() }),
        totalIncome: increment(income.amount),
      });
      toast.success("Income added successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  const addExpense = useCallback(async (expense) => {
    try {
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");
      await updateDoc(userRef, {
        expenses: arrayUnion({ ...expense, createdAt: new Date().toISOString() }),
        totalExpenses: increment(expense.amount),
      });
      toast.success("Expense added successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  // DELETE ITEMS
  const deleteDebt = useCallback(async (debt) => {
    try {
      if (!debt?.id) throw new Error("Invalid debt data");
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");
      await updateDoc(userRef, {
        debts: arrayRemove(debt),
        ...(debt.owedByMe
          ? { totalDebtOwedByMe: increment(-debt.amount) }
          : { totalDebtOwed: increment(-debt.amount) }),
      });
      toast.success("Debt deleted successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  const deleteIncome = useCallback(async (income) => {
    try {
      if (!income?.id) throw new Error("Invalid income data");
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");
      await updateDoc(userRef, {
        incomes: arrayRemove(income),
        totalIncome: increment(-income.amount),
      });
      toast.success("Income deleted successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  const deleteExpense = useCallback(async (expense) => {
    try {
      if (!expense?.id) throw new Error("Invalid expense data");
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");
      await updateDoc(userRef, {
        expenses: arrayRemove(expense),
        totalExpenses: increment(-expense.amount),
      });
      toast.success("Expense deleted successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  // UPDATE ITEM
  const update = useCallback(async (item, array, field) => {
    try {
      if (!item?.id || !Array.isArray(array) || !field) {
        throw new Error("Invalid update parameters");
      }
      const newArray = array.map((el) => (el.id === item.id ? item : el));
      const userRef = getUserRef();
      if (!userRef) throw new Error("User not authenticated");

      const fieldMap = {
        debt: "debts",
        income: "incomes",
        expense: "expenses",
      };
      const firestoreField = fieldMap[field] || field;

      await updateDoc(userRef, {
        [firestoreField]: newArray,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Updated successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  }, [getUserRef, handleFirebaseError]);

  // Derived totals for the current month's filter (computed during render)
  const total = useMemo(() => {
    const calculateSum = (items) => {
      if (!Array.isArray(items) || items.length === 0) return 0;
      return items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    };

    const belongsToMonth = (item) => {
      const itemDate = new Date(item.createdAt || item.date);
      return itemDate.getMonth() === monthFilter;
    };

    const filteredDebts = debts.filter(
      (debt) => belongsToMonth(debt) && !debt.settled
    );

    return {
      debtOwed: calculateSum(filteredDebts.filter((debt) => !debt.owedByMe)),
      debtOwedByMe: calculateSum(filteredDebts.filter((debt) => debt.owedByMe)),
      incomes: calculateSum(incomes.filter(belongsToMonth)),
      expenses: calculateSum(expenses.filter(belongsToMonth)),
    };
  }, [debts, incomes, expenses, monthFilter]);

  // Subscribe to user data changes
  useEffect(() => {
    if (!user?.uid) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setDebts(userData.debts || []);
          setIncomes(userData.incomes || []);
          setExpenses(userData.expenses || []);
        }
        setLoading(false);
      },
      (error) => {
        handleFirebaseError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, handleFirebaseError]);

  const contextValue = useMemo(
    () => ({
      debts,
      setDebts,
      incomes,
      setIncomes,
      expenses,
      setExpenses,
      loadingData,
      addDebt,
      addIncome,
      addExpense,
      total,
      deleteDebt,
      deleteIncome,
      deleteExpense,
      update,
      setMonthFilter,
      monthFilter,
    }),
    [debts, incomes, expenses, loadingData, total, monthFilter, addDebt, addIncome, addExpense, deleteDebt, deleteIncome, deleteExpense, update]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};

export default MainContext;
