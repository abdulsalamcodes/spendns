import React, { useEffect } from "react";

const Modal = ({ Component, isOpen, closeAction }) => {

  
  useEffect(() => {
    
    const bodyRef = document.body;
    if (isOpen) {
      bodyRef.style = "overflow: hidden"
    } else {
      bodyRef.style = "overflow: scroll"
    }

    return bodyRef.style = "overflow: scroll"
  }, [isOpen])
  return (
    <>
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
      >
        {isOpen && (
          <div className="flex items-center justify-center min-h-screen py-2 text-center sm:block ">
            <div className="fixed inset-0 transition-opacity" onClick={closeAction}>
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
            {Component}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
