import { combineReducers } from "redux";
import checkLogin from "../modules/Login";
import checkModal from "../modules/ModalState";
const rootReducer = combineReducers({
  checkLogin,
  checkModal,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
