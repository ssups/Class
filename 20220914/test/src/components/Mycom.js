import React from "react";

// 이렇게 컴포넌트로 작업을 하면 좋은점은
// 일반 태그처럼 우리가 원하는 내용을 태그화해서 사용할수 있기 때문에
// 코드의 재활용성이 용이해진다.
// 유지보수가 편하다.

// 리액트의 데이터 구조는 단방향 -> 위에서 아래로 데이터를 전달해줄수 있다. (index.js -> App.js -> Mycom.js)
// 여기서 받은 num 매개변수의 명칭은 props이다.
// 부모 컴포넌트가 자식 컴포넌트한테 다방향으로 데이터를 전달해줄 수 있는데 attribute 형식으로 넣어주면 porps 에서 객체로 받는다?
// 컴포넌트 안에서 태그 안에 중괄호 써주면 그안에 스크립트문을 쓸수있다.
// 컴포넌트 안에서 태그 classname을 설정해줄때는 class 말고 className으로 줘야함
const Mycom = data => {
    console.log(data);
    const { name, age } = data;
    return (
        <div className={"com " + name}>
            나는 컴포넌트{name} <br />
            나이는{age}살 <br />
            <br />
        </div>
    );
};

// default 는 하나만 export 할때 사용함
export default Mycom;
