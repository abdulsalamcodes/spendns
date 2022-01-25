import React from "react";
import DebtPage from "../components/Debt";
import withAuth from "../hoc/WithAuth";

const Debt = () => {
  return (
      <DebtPage />
  );
};

export default withAuth(Debt);
