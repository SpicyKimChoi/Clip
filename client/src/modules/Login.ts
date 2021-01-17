const LOGIN = "Login/LOGIN" as const;
const LOGOUT = "Login/LOGOUT" as const;

type LoginState = {
  isLogin: boolean;
};
type LoginAction = ReturnType<typeof login> | ReturnType<typeof logout>;

export const login = () => ({
  type: LOGIN,
});
export const logout = () => ({
  type: LOGOUT,
});

const initialState: LoginState = {
  isLogin: false,
};
const checkLogin = (state: LoginState = initialState, action: LoginAction) => {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true };
    case LOGOUT:
      return { isLogin: false };
    default:
      return state;
  }
};

export default checkLogin;
