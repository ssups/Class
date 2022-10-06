let init = {
    weatherData: {},
};

function reducer(state = init, { type, payload }) {
    switch (type) {
        case "GET_WEATHER_DATA":
            return { ...state, weatherData: payload };
        default:
            return state;
    }
}

export default reducer;
