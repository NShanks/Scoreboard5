import React, { useRef, useEffect } from "react";

interface ModalProps {
  children?: React.ReactElement;
  isOpen: boolean;
  closeModal: () => void;
  onSubmit?: () => void;
}

const Modal = ({ children, isOpen, closeModal, onSubmit }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex justify-center bg-black items-center bg-opacity-70 backdrop-blur-sm transition ease-in duration-1000 z-50">
      <div ref={modalRef} className="bg-white rounded p-2">{children}</div>
    </div>
  );
};

export default Modal;
