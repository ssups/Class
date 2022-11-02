export class BlockHeader implements IBlockHeader {
  // public은 어디에서든지 접근가능하게 하는 속성 (private과 반대)
  public version: string;
  public height: number;
  public timestamp: number;
  public previousHash: string;
  constructor(_previousBlock: IBlock) {
    this.version = BlockHeader.getVersion();
    this.timestamp = BlockHeader.getTimestamp();
    this.height = _previousBlock.height + 1;
    this.previousHash = _previousBlock.hash;
  }

  // static매서드를 사용하면 인스턴스에 매서드가 포함되지 않아서
  // 인스턴스 생성시 비효율성을 방지 가능
  // 클래스 내에서 함수를 만들어 사용하고 싶을때 static 매서드를 주로 활용함
  public static getVersion() {
    return "1.0.0";
  }
  public static getTimestamp() {
    return new Date().getTime();
  }
}

// 여기서 implements는
// extends와 implements 차이

// extends : 클래스를 상속받을때 사용한다.
// 클래스를 정의할때 extends를 사용해서 부모클래스를 상속받게 되면 자식클래스는 부모클래스의 속성과 메소드를 가져올수 있다.
// (자식클래스에서 추가 정의할 필요가 없다.)

// implements : 특정 클래스 혹은 미리 정해놓은 인터페이스와 똑같은 형태로
// 클래스를 정의하고 싶을때(extends 이거랑 다른것)
