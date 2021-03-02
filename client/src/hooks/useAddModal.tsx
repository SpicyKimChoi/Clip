import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { privateModal, publicModal } from "../modules/AddModal";

export default function useModal() {
  const dispatch = useDispatch();
  const isPrivate = useSelector(
    (state: RootState) => state.checkAddModal.isPrivate,
  );
  const makePrivate = useCallback(() => dispatch(privateModal()), [dispatch]);
  const makePublic = useCallback(() => dispatch(publicModal()), [dispatch]);

  return {
    isPrivate,
    makePrivate,
    makePublic,
  };
}
