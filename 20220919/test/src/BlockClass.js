import { React, Component } from "react";

// 클래스 컴포넌트
// 생긴건 함수형과 그렇게 많이 다르진 않은데
// 클래스로 선언되었고 리액트에서 제공하는 Component라는 클래스를 상속 받아 온다.
export default class BlockClass extends Component {
    // constructor lifecycle 함수중 하나고 생성자임
    // 컴포넌트가 생성되면 제일 처음으로 실행되는 함수
    constructor(props) {
        // super() 자식 클래스가 생성될떄 부모 클래스의 생성자를 참조하는 방법
        // react 클래스 컴포넌트의 부모 클래스는 react.Component가 된다.
        // super를 쓰는 이유는 super를 사용하기 전에는 constructor 안에서 this를 쓸수가 없음
        // 그래서 결국 consturctor 생성자 내부에서 this.props를 쓰기위해서 super를 사용하는 것이다.
        super(props);
        // 함수형에서는 useState()훅을 썻지만
        // 클래스 컴포넌트에서는 만들어서 씀
        // 클래스 컴포넌트에서는 state값을 객체로 사용한다.
        // 이 state값이 변경되면 다시 리렌더링 된다.

        // const [num,setNum] = useState(0)
        // const [name,setName] = useState('민섭')
        // 이걸 클래스형에서는 아래와 같이 쓴다
        this.state = {
            num: 0,
            name: "민섭",
        };
        console.log("consturctor");
    }
    // BlockClass 컴포넌트가 렌더되고나서 최초 한번만 실행되는 함수
    componentDidMount() {
        // useEffect()
        // 작업을 하면은 여기서 주로 데이터 베이스 값을 가져온다.
        // componentDIdMount 이게 UI를 그려준 다음에 실행되는 함수이기 때문에
        // UI를 그리기 전에 데이터를 가져와서 넣어줄수가 없기 때문에
        // UI를 그려주고 데이터를 가져와서 동작 시켜주기 위해서
        // componentDidMount lifecycle 함수를 이용한다.
        console.log("componentDidMount");
    }
    componentDidUpdate() {
        // useRef()
        // 전에 말했던 함수형에서 useState() 함수 class 컴포넌트에서는 setState() 함수
        // state 값이 변하는 것은 비동기라고 했는데
        // componentDidUpdate()함수는 state 값이 업데이트 된 뒤 실행되기 때문에
        // state값을 업데이트하고 실행할 함수들을 넣어주는 곳이다.
        console.log(this.state);
        console.log("componentDidUpdate");
    }
    add = () => {
        // class 컴포넌트에서 state 값을 변하게 하고싶으면 setState()함수를 이용해서 값을 수정한다.
        // setState 함수의 인수에 객체형태로 key에는 업데이트 대상 값, value에는 업데이트할 값 을 입력한다.
        this.setState({ num: this.state.num + 1, name: "안녕" });
    };
    render() {
        console.log("render");
        return (
            <div>
                {/* 변수 전달할때 하나의 클래스안에 속해있는거라서 this를 변수명 앞에 붙여줘야 한다. */}
                <button onClick={this.add}>클릭</button>
                <span>num : {this.state.num}</span>
                {/* props값(부모 컴포넌트에서 받은값) 사용하기 */}
                <div>{this.props.test}</div>
            </div>
        );
    }
}
