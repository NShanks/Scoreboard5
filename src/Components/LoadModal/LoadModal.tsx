interface LoadModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoadModal = ({ isOpen, closeModal }: LoadModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Load Modal</h2>
            <p>
              The goal of this modal is to display a list of previous
              tournaments with the information from the past. Will have to link
              this to a database and all that stuff.
            </p>
            <button className="close-modal" onClick={closeModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadModal;
