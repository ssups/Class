import reducer from "./reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

// applyMiddleware 미들웨어를 적용시켜주는 함수
// applyMiddleware() 적용시킬 미들웨어 인수로 전달

// createStore 함수의 두번째 매개변수로 applyMiddleware 함수를 전달하고
// applyMiddleware 함수의 매개변수로 사용할 미들웨어 전달은 지금은 thunk
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
