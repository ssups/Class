import "./App.css";
import Box from "./components/box";
// import { Box, BoxesWrap } from "./components/box";

function App() {
    const repeat = () => {
        const result = [];
        const randNums = [];
        for (let i = 0; i < 5; i++) {
            const randNum = Math.floor(Math.random() * 25 + 1);
            if (randNums.includes(randNum)) i--;
            randNums.push(randNum);
        }
        for (let i = 1; i <= 25; i++) {
            if (randNums.includes(i)) {
                result.push(<Box isBomb="bomb" isClicked="false" />);
            } else {
                result.push(<Box isBomb="" isClicked="false" />);
            }
        }
        return result;
    };
    return (
        <div className="App">
            {repeat()} <button>재시작</button>
        </div>
    );
}

export default App;
