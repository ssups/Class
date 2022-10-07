import { createStore } from "redux";
import reducer from "./reducer";
// createStore는 사용할 redux 저장소를 만들어주는 함수이다
// createStored의 매개변수로는 reducer(리듀서)를 전달해준다.

// 순서
// 저장소를 리듀서에 추가해서 저장소를 만들고
// 저장소를 Provider로 적용시키고
// App컴포넌트에 적용시키는 구조

// let store = createStore("여기에 리듀서를 넣어줄것");
let store = createStore(reducer);

export default store;
