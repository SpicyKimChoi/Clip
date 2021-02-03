/*eslint-disable no-unused-vars*/
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { addClip, deleteClip, editClip, Input } from "../modules/PrivateClip";

export default function usePrivateClip() {
  const dispatch = useDispatch();
  const privateClipArr = useSelector((state: RootState) => state.privateClip);
  const addPrivateClip = useCallback((obj: Input) => dispatch(addClip(obj)), [
    dispatch,
  ]);
  const deletePrivateClip = useCallback(
    (id: number) => dispatch(deleteClip(id)),
    [dispatch],
  );
  const editPrivateClip = useCallback((obj: Input) => dispatch(editClip(obj)), [
    dispatch,
  ]);
  return {
    privateClipArr,
    addPrivateClip,
    deletePrivateClip,
    editPrivateClip,
  };
}
