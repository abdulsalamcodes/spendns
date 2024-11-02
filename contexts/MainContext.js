import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toast";
import { db } from "../firebase";
import AuthContext from "./AuthContext";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [debts, setDebts] = useState([]);
  const [loadingData, setLoading] = useState(false);
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth());
  const [total, setTotal] = useState({
    debtOwedByMe: 0,
    debtOwed: 0,
  });

  // Helper function to handle Firebase errors
  const handleFirebaseError = (error) => {
    console.error("Firebase error:", error);
    toast.error(error.message || "An error occurred.");
  };

  // Helper function to get user reference
  const getUserRef = () => {
    console.log("user", user);
    if (!user?.uid) {
      throw new Error("User not authenticated");
    }
    return doc(db, "users", user.uid);
  };

  // CREATE ITEMS
  const addDebt = async (debt) => {
    try {
      // console.log("Debt", debt);
      // if (!debt || typeof debt.amount !== "number") {
      //   throw new Error("Invalid debt data");
      // }

      const userRef = getUserRef();
      await updateDoc(userRef, {
        debts: arrayUnion({ ...debt, createdAt: new Date().toISOString() }),
        totalDebtOwed: debt.owedByMe ? increment(0) : increment(debt.amount),
        totalDebtOwedByMe: debt.owedByMe
          ? increment(debt.amount)
          : increment(0),
      });

      toast.success("Debt added successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // DELETE ITEMS
  const deleteDebt = async (debt) => {
    try {
      if (!debt?.id) {
        throw new Error("Invalid debt data");
      }

      const userRef = getUserRef();
      await updateDoc(userRef, {
        debts: arrayRemove(debt),
        totalDebtOwed: debt.owedByMe ? increment(0) : increment(-debt.amount),
        totalDebtOwedByMe: debt.owedByMe
          ? increment(-debt.amount)
          : increment(0),
      });

      toast.success("Debt deleted successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // UPDATE ITEM
  const update = async (item, array, field) => {
    try {
      if (!item?.id || !Array.isArray(array) || !field) {
        throw new Error("Invalid update parameters");
      }

      const newArray = array.map((el) => (el.id === item.id ? item : el));
      const userRef = getUserRef();

      const updateFields = {
        [field === "debt" ? "debts" : field]: newArray,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(userRef, updateFields);
      toast.success("Updated successfully!");
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // Calculate totals when debts change
  useEffect(() => {
    const calculateSum = (items) => {
      if (!Array.isArray(items) || items.length === 0) return 0;
      return items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    };

    const filteredDebts = debts.filter((debt) => {
      const debtMonth = new Date(debt.createdAt).getMonth();
      return debtMonth === monthFilter && !debt.settled;
    });

    setTotal({
      debtOwed: calculateSum(filteredDebts.filter((debt) => !debt.owedByMe)),
      debtOwedByMe: calculateSum(filteredDebts.filter((debt) => debt.owedByMe)),
    });
  }, [debts, monthFilter]);

  // Subscribe to user data changes
  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    const userRef = getUserRef();

    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setDebts(userData.debts || []);
        }
        setLoading(false);
      },
      (error) => {
        handleFirebaseError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Memoize context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      debts,
      setDebts,
      loadingData,
      addDebt,
      total,
      deleteDebt,
      update,
      setMonthFilter,
      monthFilter,
    }),
    [debts, loadingData, total, monthFilter]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

// Custom hook for using the context
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};

export default MainContext;
