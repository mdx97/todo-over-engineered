import { NiceModalHandler, useModal } from "@ebay/nice-modal-react";

interface ExtendedHandler extends NiceModalHandler {
  /** Return a resolved promise *and* hide the modal. */
  success: (args?: unknown) => void;

  /** Return a rejected promise *and* hide the modal. */
  failure: (args?: unknown) => void;
}

/** Thin wrapper around nice-modal's `useModal` hook that provides extra methods. */
export default function useModalExtended(): ExtendedHandler {
  const handler = useModal();

  return {
    ...handler,
    success: (args?: unknown) => {
      handler.resolve(args);
      handler.hide();
    },
    failure: (args?: unknown) => {
      handler.reject(args);
      handler.hide();
    },
  };
}
