import { NiceModalHandler } from "@ebay/nice-modal-react";
import { ReactNode } from "react";
import ReactModal from "react-modal";

interface Props extends ReactModal.Props {
  children: ReactNode;
  handler: NiceModalHandler;
}

function Modal({ children, handler, className, ...rest }: Props) {
  return (
    <ReactModal
      {...rest}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card w-[500px] ${className}`.trim()}
      onRequestClose={() => handler.hide()}
      onAfterClose={() => handler.remove()}
    >
      {children}
      <button
        className="absolute top-1 right-1 button button--plain text-xl"
        onClick={() => handler.hide()}
      >
        X
      </button>
    </ReactModal>
  );
}

export default Modal;
