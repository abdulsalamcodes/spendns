import React, { useContext, useState } from "react";
import moment from "moment";
import {
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  CircleDollarSign,
  Eye,
  Pencil,
  MoreVertical,
  Trash,
} from "lucide-react";
import MainContext from "../contexts/MainContext";
import Modal from "./UI/Modal";
import ViewItemModal from "./ViewItemModal";
import Form from "./Form";

const ItemCard = ({ detail, itemType }) => {
  const [activeModal, setActiveModal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    deleteExpense,
    deleteIncome,
    deleteDebt,
    update,
    incomes,
    debts,
    expenses,
  } = useContext(MainContext);

  const closeAction = () => {
    setActiveModal("");
    setShowDropdown(false);
  };

  const typeConfig = {
    income: {
      icon: <ArrowDownCircle className="h-6 w-6 text-green-500" />,
      colorClass: "text-green-600",
      bgClass: "bg-green-50",
      borderClass: "border-green-200",
      badgeClass: "bg-green-100 text-green-700",
      deleteAction: deleteIncome,
      items: incomes,
      form: (
        <Form
          closeAction={closeAction}
          type="income"
          submitHandler={update}
          detail={detail}
          items={incomes}
        />
      ),
    },
    expense: {
      icon: <ArrowUpCircle className="h-6 w-6 text-rose-500" />,
      colorClass: "text-rose-600",
      bgClass: "bg-rose-50",
      borderClass: "border-rose-200",
      badgeClass: "bg-rose-100 text-rose-700",
      deleteAction: deleteExpense,
      items: expenses,
      form: (
        <Form
          closeAction={closeAction}
          type="expense"
          submitHandler={update}
          items={expenses}
          detail={detail}
        />
      ),
    },
    debt: {
      icon: <CircleDollarSign className="h-6 w-6 text-blue-500" />,
      colorClass: "text-blue-600",
      bgClass: "bg-blue-50",
      borderClass: "border-blue-200",
      badgeClass: "bg-blue-100 text-blue-700",
      deleteAction: deleteDebt,
      items: debts,
      form: (
        <Form
          closeAction={closeAction}
          type="debt"
          detail={detail}
          items={debts}
          submitHandler={update}
        />
      ),
    },
  };

  const config = typeConfig[itemType];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <>
      <div
        className={`mb-4 rounded-lg border ${config.borderClass} ${config.bgClass}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-white shadow-sm">
                {config.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`text-lg font-semibold ${config.colorClass}`}>
                    {formatAmount(detail?.amount)}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${config.badgeClass}`}
                  >
                    {itemType}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {/* {moment(detail?.date.toDate()).format("DD/MM/YYYY")} */}
                  {itemType === "debt" && detail.personInvolved && (
                    <span className="ml-2 font-medium">
                      • {detail.owedByMe ? "Owed to" : "Owed by"}:{" "}
                      {detail.personInvolved}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {detail.settled ? (
                <button
                  onClick={() => {
                    update({ ...detail, settled: false }, debts, "debt");
                  }}
                  className="px-4 py-2 text-sm font-medium text-rose-500 bg-white border border-rose-200 rounded-md hover:bg-rose-50 transition-colors"
                >
                  Unclear
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setActiveModal("view")}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                      <MoreVertical className="h-4 w-4 ml-1" />
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={() => {
                              setActiveModal("edit");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Pencil className="h-4 w-4 inline mr-2" />
                            Edit Details
                          </button>
                          <button
                            onClick={() => config.deleteAction(detail.id)}
                            className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Trash className="h-4 w-4 inline mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        closeAction={closeAction}
        Component={
          <ViewItemModal
            onClose={closeAction}
            deleteAction={config.deleteAction}
            detail={detail}
            icon={config.icon}
            tag={itemType}
          />
        }
        isOpen={activeModal === "view"}
      />
      <Modal
        closeAction={closeAction}
        Component={config.form}
        isOpen={activeModal === "edit"}
      />
    </>
  );
};

export default ItemCard;
