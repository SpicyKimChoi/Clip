/*eslint-disable no-unused-vars*/
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { login, logout } from "../modules/Login";

export default function useLogin() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.checkLogin.isLogin);
  const onLogin = useCallback(() => dispatch(login()), [dispatch]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return {
    isLogin,
    onLogin,
    onLogout,
  };
}
