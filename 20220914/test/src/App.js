import "./App.css"; // css파일 가져오는 방법
// import Mycom from "./components/Mycom";
import Date from "./components/Date";

// App.js에서는 componets 폴더안에서 만든 컴포넌트들 import 해와서 쓰는듯
// App.js에서 컴포넌츠 전부 모아서 App컴포넌트안에 넣어서 export하고,
// index.js에서 최종으로 App 컴포넌트 import해와서 root 안에 render 해서 쓰는 구조인듯 하다.

function App() {
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const repeating = () => {
        const result = [];
        for (let i = 1; i <= 30; i++) {
            if (i % 7 === 3 || i % 7 === 4) {
                result.push(<Date date={i} weekend="true" />);
            } else {
                result.push(<Date date={i} weekend="false" />);
            }
        }
        return result;
    };

    return (
        <div className="App">
            {day.map(el => (
                <span className="box daybox">
                    <h2 className="day">{el}</h2>
                </span>
            ))}
            <span className="box"></span>
            <span className="box"></span>
            <span className="box"></span>
            <span className="box"></span>
            {repeating()}
            <span className="box"></span>
        </div>
    );
}

export default App;
