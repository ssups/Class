declare type Result<R> = { isError: false; value: R };
declare type Failure<E> = { isError: true; value: E };
declare type Failable<R, E> = Result<R> | Failure<E>;

// typeScript 제너릭
// 선언 시점이 아니라 생성 시점에 타입을 명시해서
// 하나의 타입이 아닌 다양한 타입을 사용할수 있는 기법이다.

// 제너릭을 왜써야 하냐
// 한번의 선언으로 다양한 타입에 재사용이 가능하다는 장점
// 제너릭을 안쓰면 불필요한 타입 변환을 하기 때문에
// 프로그램의 성능 향상에 도움이 된다.

// 제네릭을 안쓰면 타입을 미리 지정하거나 any를 사용하면 되는데
// 타입을 미리 지정하면 정해진 타입을 써야하고
// any를 사용하면 자료타입을 제한할수 없고, 어떤 데이터 타입이 반환되는지 알수 없다.

type A<T> = { value: T };
// 이런식으로 쓰면 A라는 타입이 사용될때 T라는 타입이 정해진다.
// function example() : A<String> {
//     return {value : "sdfr"}
// }
// example이라는 함수에서 A타입을 사용할때 T값에 String을 전달했기때문에
// return 값이 되는 객체의 value 타입은 String 이 되어야 하는것이다.

type B<T, S> = { value: T | S };
// function D(): B<String | number> {
//   if (true) return { value: "dfer" };
//   else return { value: 1234 };
// }
// B라는 타입은 사용전까지진 정해지지 않음
// function D에서 사용되면 T에는 String S에는 number 타입이 전달됨
// 결과적으로 return값이 되는 객체의 value 타입은 String 혹은 number 둘중의 하나로 제한된다.
