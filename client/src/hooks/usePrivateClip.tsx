/*eslint-disable no-unused-vars*/
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { addClip, deleteClip, Input } from "../modules/PrivateClip";

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
  return {
    privateClipArr,
    addPrivateClip,
    deletePrivateClip,
  };
}
