import { createStore } from "redux";
import { user_profile } from "./User/reducer";
import { msg_reducer } from "./message/reducer";
import { selection_reducer } from "./userSelect/reducer";
import { combineReducers } from "redux";

const root_reducer = combineReducers({
  user: user_profile,
  msg: msg_reducer,
  sr: selection_reducer,
});

const store = createStore(root_reducer);

export default store;
