import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";
import { weather, logins } from "./middleware";
import { useEffect, useState } from "react";
// get 요청방식
// axios({ url : ''})

// post 요청 방식
// axios({
//   // method 의 default 값은 get
//   method: "post",
//   url: "",
//   // post 방식은 데이타 받기전에 먼저 넘겨줘야함
//   data: {넘길값}
// })

function App() {
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    // 리듀서 여러개로 놔눠나서 selector로 찾아올때 state.리듀서이름.state이름 총 세단계로 적어줘야한다.
    const weatherData = useSelector(state => state.weather.weatherData);
    const isLoigned = useSelector(state => state.login.isLogined);
    const userName = useSelector(state => state.login.id);
    // async function getWeather() {
    //     const data = await axios({
    //         url: "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=3a9f5ef2310eb6ef92b112dc4e282243",
    //     });
    //     console.log(data.data.main);
    //     console.log(data.data.clouds);
    //     console.log(data.data.wind);
    // }
    // getWeather();
    const getWeather = cityName => {
        // dispatch 활용해서 middleware에 있는 함수 실행시킴
        dispatch(weather.getWeather(cityName));
    };

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    const login = () => {
        dispatch(logins.login(id, pw));
    };
    const logout = () => {
        dispatch(logins.logout());
    };
    return (
        <div className="App">
            <label htmlFor="cityName">도시 이름</label>
            <input
                type="text"
                id="cityName"
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => getWeather(name)}>날씨 검색</button>
            {/* weatherData랑 weatherData.data둘다 있으면 name 보여주고 없으면 안보여주기 */}
            <div>
                지금 {weatherData.data?.name} 날씨는 :{" "}
                {weatherData && weatherData.data?.weather[0]?.main}
            </div>
            <br />
            <label htmlFor="inputId">아이디</label>
            <br />
            <input
                type="text"
                id="inputId"
                onChange={e => setId(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="inputPw">비밀번호</label>
            <br />
            <input
                type="text"
                id="inputPw"
                onChange={e => setPw(e.target.value)}
            />
            <br />
            <button onClick={login}>로그인</button>
            <div>로그인 됨?</div>
            {isLoigned ? (
                <div>
                    {userName} 유저 로그인 됨
                    <button onClick={logout}>로그아웃</button>
                </div>
            ) : (
                <div> 로그인 안됨</div>
            )}
        </div>
    );
}

export default App;
