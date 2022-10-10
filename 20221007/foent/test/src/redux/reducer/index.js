import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import shopReducer from "./shopReducer";

const rootReducer = combineReducers({ loginReducer, shopReducer });

export default rootReducer;
