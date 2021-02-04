/*eslint-disable no-unused-vars*/
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { title } from "../modules/Title";
import { url } from "../modules/Url";
import { discription } from "../modules/Discription";

export default function useInput() {
  const dispatch = useDispatch();
  const titleState = useSelector((state: RootState) => state.makeTitle.text);
  const urlState = useSelector((state: RootState) => state.makeUrl.text);
  const discriptionState = useSelector(
    (state: RootState) => state.makeDiscription.text,
  );

  const makeTitle = useCallback((text: string) => dispatch(title(text)), [
    dispatch,
  ]);
  const makeUrl = useCallback((text: string) => dispatch(url(text)), [
    dispatch,
  ]);
  const makeDiscription = useCallback(
    (text: string) => dispatch(discription(text)),
    [dispatch],
  );

  return {
    titleState,
    urlState,
    discriptionState,
    makeTitle,
    makeUrl,
    makeDiscription,
  };
}
