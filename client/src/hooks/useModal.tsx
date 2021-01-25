import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { modalOpen, modalClose } from "../modules/ModalState";

export default function useModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.checkModal.isOpen);
  const onOpen = useCallback(() => dispatch(modalOpen()), [dispatch]);
  const onClose = useCallback(() => dispatch(modalClose()), [dispatch]);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
