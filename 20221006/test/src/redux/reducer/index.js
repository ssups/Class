let init = {};

function reducer(state = init, { type, payload }) {
    switch (type) {
        case "value":
            return;

        default:
            return state;
    }
}

export default reducer;
