// axios
// axios는 브라우저
// 자바스크립트에 fetch가 있긴한데
// 프레임워크에선 ajax를 구현할땐 axois를 주로 쓰는 편이다.
// 속성은 url 필수고 나머지는 전달을 안해도 상과없다 (옵션)
// method는 지정안하면 기본이 디폴트가 get방식

import axios from "axios";

// axios 설치 명령어
// npm i axios

function getWeather(cityName) {
    // thunk가 해주는 일은 Action Creators라는 함수를 만들어 주는것
    // Action Creators 함수는 함수를 반환한다.
    // thunk는 dispatch를 딜레이 시켜주는 역할
    // action함수는 함수를 return한다.
    // dispatch랑 getState 둘다 함수이다
    return async (dispatch, getState) => {
        const data = await axios({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3a9f5ef2310eb6ef92b112dc4e282243`,
        });
        // console.log(data);
        // console.log(getState());
        dispatch({ type: "GET_WEATHER_DATA", payload: data });
        // console.log(getState());
        // getState() 함수는 store 저장소에 있는 state 객체를 반환해준다.
    };
}

export const weather = { getWeather };
