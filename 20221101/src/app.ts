// 기본타입은 boolean, number , string, undefined , null 등이 있다

// 숫자타입
const num: number = 100;

// 문자타입
const str: string = "ㅎㅇ";

// bool 타입
const bool: boolean = true;

// 배열은 타입[] 붙여주면 된다.
const array: number[] = [1, 2];

// undefined
const undefinedType: undefined = undefined;

// null 타입
const nullType: null = null;

// 객체 타입
const obj: { str: string } = { str: "안녕" };

const obj1: { str: string; num?: number } = { str: "안녕" };

// ts는 별칭 타입 사용이 가능

type blockHeader = {
  version: string;
  height: number;
};
// blockHeader라는 사용자 지정 타입을 만들었고 필요할 때마다 재활용이 가능

const block: blockHeader = {
  version: "1.0.0",
  height: 0,
};

// tuple(튜플) : tuple은 배열을 생성할 수 있게 하는데 특정위치에 특정 타입이 있어야한다

const tuple: [string, number, boolean?] = ["안뇽", 100, true];

// any : 타입 제한이 없다 TS의 검사를 비활성화 시킨다
//  any 아무 타입이나 될 수 있다
// undefined: 애는 undefined값만 가질 수 있다.

const any: any = ["안녕", 123, true];

// unknown : 어떤 타입인지 모를 때 아직 변수를 사용하는 경우
// 미리 타입을 알지 못할 때 사용 하지만 그냥 사용 안됨
// unknown 타입으로 변수를 정의하면 검사하라는 경고를 줌

// 오류코드

const numUnknown: unknown = "100";
// console.log(numUnknown.length)  오류가뜬다

// 정상 코드
if (typeof numUnknown === "string") {
  console.log(numUnknown.length);
}

// void : 비어 있다는걸 의미 TS에서 함수를 정의할때 매개변수의 타입과
// return값의 타입을 지정해주는 return 값이 없는 함수는 void타입을 사용하고 있다,.

// function 함수명() : return타입 {}
// void는 안쓰면 TS는 그냥 자동으로 void타입을 준다. 굳이 안써도 됨

function fun(num: number): void {
  console.log("ㅎㅇㄹ");
}

myName.name = "ㅎㅇ";
