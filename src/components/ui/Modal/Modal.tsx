import Backdrop from "../Backdrop/Backdrop";
//Types
type ModalProps = {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps): JSX.Element => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } z-20 fixed min-w-full min-h-screen backdrop-filter backdrop-blur`}
    >
      <Backdrop onClick={onClose} />
      <div className="m-auto z-10 w-3/4 md:w-1/3">{children}</div>
    </div>
  );
};

export default Modal;
