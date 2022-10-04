import { combineReducers } from "redux"; // 리듀서 파일 여러개로 나눠서 쓸때 사용
// 각각의 reducer 함수들 import 해와서 combineReducer 함수 객체형태의 인수로 전달
// export default combineReducers({리듀서함수1 이름 : 리듀서함수1, 리듀서함수2 이름 : 리듀서함수2})
// 여기에 추가로 store.js 에 import thunk from "redux-thunk"랑
// import applyMiddleware from "redux"랑 import composeWithDevTools from "redux-devtools-extnsion"
// 해주고 let store = createStore(합친리듀서, composeWithDevTools(applyMiddleware(thun))) 이렇게 해줘야함

let init = {
    isLogined: false,
    userData: [
        {
            id: "admin",
            nick_name: "어드민",
            pw: "123",
        },
    ],
    loginedUserData: null,
};

function reducer(state = init, action) {
    const { type, payload } = action;
    switch (type) {
        case "LOGIN":
            return { ...state, isLogined: true, loginedUserData: payload };
        case "LOGOUT":
            return { ...state, isLogined: false };
        case "JOIN":
            return { ...state, userData: payload };
        case "MODIFY_USER_DATA":
            return { ...state, userData: payload };
        default:
            console.log("디폴트");
            return state;
    }
}

export default reducer;
