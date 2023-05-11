import React from "react";

interface ModalProps {
  children?: React.ReactElement;
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: () => void;
}

const Modal = ({ children, isOpen, closeModal, onSubmit }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 flex justify-center bg-black items-center bg-opacity-70 backdrop-blur-sm ease-in-out duration-1000 z-50">
      <div className="bg-white rounded p-2">{children}</div>
    </div>
  );
};

export default Modal;
