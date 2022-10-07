// reducer 함수를 만들어 보자
// reducer 함수를 만드는데 필요한 매개변수는
// 두가지 state와 action
// state는 초기화가 필요하다.

let init = {
    // init값은 useState로 치자면 useState에 들어가는 인수값
    count: 0,
};

// state = init 초기값을 전달해준다.
function reducer(state = init, action) {
    // 이곳에 동작할 기능들을 작성해준다.
    console.log(action);
    // action에는 컴포넌트에서 실행시킨 disatch의 인수값이 들어가게된다.
    switch (action.type) {
        case "ADD":
            console.log("더하기");
            // 리듀서가 저장소의 값을 변경해주는데 이 반환값을 받아서 바꿔주는 것이기 때문
            // 저장소는 항상 대기하다가 리듀서가 return 값을 주면 적용을 바로 시켜준다.
            // ...state 이렇게 써주는 이유는 객체에 여러값이 있을수 있는데 값을 그대로 유지하고
            // count만 바꾸려고 하는것
            return { ...state, count: state.count + 1 }; // 이 return 값은 rudcer의 새로운 첫번째 인수(state)값으로 들어가는듯?
        case "REMOVE":
            console.log("뺴기");
            return { ...state, count: state.count - 1 };

        default:
            return state;
    }
}

export default reducer;
