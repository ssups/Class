import { React, useState } from "react";

// 리액트가 왜 리액트인지.
// 자기 값이 변하면 반응해서 알려주고
// 리액트는 반응한 애를 그려준다.
// 리렌더링이라고 함
const Block = data => {
    let count = 0;
    function add() {
        // console.log(count);
        setnum(num1 + 1);
        console.log(num1);
        // setnum함수는 비동기적으로 돌아가서 console 로 찍은값이 변하기전에 동작한다
        // 따라서 콘솔로 찍는 값은 하나씩 밀린다.
    }
    const [num1, setnum] = useState(count);
    // useState 리액트에게 값을 주시하게 만들고 변하면 해당값만 다시 그리게 해준다
    // 배열의 첫번째는 실사용값 즉 우리가 사용할 값이고(주시하는 값)
    // 배열의 두번째는 이 값을 수정할 수 있는 함수
    // useState 함수의 매개변수가 초기 세팅값
    // setnum 함수를 사용해서 값을 수정할땐 setnum 함수의 매개변수로 전달
    // 일반변수(여기서는 count)는 다시 그려주면 계속 초기값으로 변한다.
    // 이유는 리렌더링 하기 때문이다
    // 하지만 useState의 인수값은 react가 보고 관리하기 때문에 리렌더 전의 값을 계속해서 들고있으면서 업데이트 시켜준다.
    // react에서 제공해주는 useState같은 유용한 함수들이 많은데
    // 이걸 리액트 훅이라고 부른다(react hook)
    return (
        <>
            <div className="block">{num1}</div>
            <button onClick={add}>더하기</button>
        </>
    );
};

export default Block;
