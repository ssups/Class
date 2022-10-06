// redux에서 지원해주는 함수
// 리듀서들(함수)을 하나로 합쳐준다.
// combineReducers 함수 안에 인수로 리듀서들을 객체형태로 담아서 넣어주면 합쳐진다.

import { combineReducers } from "redux";
import login from "./login";
import weather from "./weather";
const rootReducer = combineReducers({ login, weather });

export default rootReducer;
