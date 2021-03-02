/*eslint-disable no-unused-vars*/
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import {
  addClip,
  deleteClip,
  editClip,
  changeClip,
  Input,
} from "../modules/PublicClip";

export default function usePublicClip() {
  const dispatch = useDispatch();
  const publicClipArr = useSelector((state: RootState) => state.publicClip);
  const addPublicClip = useCallback((obj: Input) => dispatch(addClip(obj)), [
    dispatch,
  ]);
  const deletePublicClip = useCallback(
    (id: number) => dispatch(deleteClip(id)),
    [dispatch],
  );
  const editPublicClip = useCallback((obj: Input) => dispatch(editClip(obj)), [
    dispatch,
  ]);
  const changePublicClip = useCallback(
    (arr: Input[]) => dispatch(changeClip(arr)),
    [dispatch],
  );
  return {
    publicClipArr,
    addPublicClip,
    deletePublicClip,
    editPublicClip,
    changePublicClip,
  };
}
