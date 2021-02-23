import { combineReducers } from "redux";
import checkLogin from "../modules/Login";
import checkModal from "../modules/ModalState";
import makeUrl from "../modules/Url";
import makeTitle from "../modules/Title";
import makeDiscription from "../modules/Discription";
import privateClip from "../modules/PrivateClip";
import publicClip from "../modules/PublicClip";
import checkAddModal from "../modules/AddModal";
const rootReducer = combineReducers({
  checkLogin,
  checkModal,
  makeDiscription,
  makeUrl,
  makeTitle,
  privateClip,
  publicClip,
  checkAddModal,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
