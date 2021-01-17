import { combineReducers } from "redux";
import checkLogin from "../modules/Login";
const rootReducer = combineReducers({
  checkLogin,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
