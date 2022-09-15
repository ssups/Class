import "./App.css";
import Block from "./components/block";
// import { image1 } from "./img";

function App() {
    return (
        <div className="App">
            {/* <img src={image1} alt="image1"></img> */}
            <Block num={0} />
        </div>
    );
}

export default App;

// 과제 지뢰찾기 만들기
// 5*5로 판을 만들고
// 폭탄 5개 정도 랜덤한 위치에 뿌리고
// 처음에 안보이다가 블럭 누르면 해당블록 안의 내용 보이게
// 폭탄 들어있으면 게임 오버
