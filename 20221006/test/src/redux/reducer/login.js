let init = {
    id: "",
    pw: "",
    isLogined: false,
};

function reducer(state = init, { type, payload }) {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                id: payload.id,
                pw: payload.pw,
                isLogined: true,
            };
        case "LOGOUT":
            return {
                ...state,
                id: payload.id,
                pw: payload.pw,
                isLogined: false,
            };
        default:
            return state;
    }
}

export default reducer;
