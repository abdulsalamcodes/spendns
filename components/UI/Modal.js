import React, { useEffect } from "react";

const Modal = ({ Component, isOpen, closeAction }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
      <div className="flex items-center justify-center py-2 text-center sm:block">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={closeAction}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        {Component}
      </div>
    </div>
  );
};

export default Modal;
