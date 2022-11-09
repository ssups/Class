import { WebSocket } from "ws";
import { Chain } from "@core/blockChain/chain";

// enum 상수인값 열거형(변하지않는값들 여러개 그냥 쓰고싶을때)
enum MessageType {
  latest_block = 0,
  all_block = 1,
  receivedChain = 2,
}
interface Message {
  type: MessageType;
  payload: any;
}

export class P2PServer extends Chain {
  private sockets: WebSocket[];
  constructor() {
    super();
    this.sockets = [];
  }

  // listen
  // 서버에 들어왔을때
  // 클라이언트가 입장했을때
  listen() {
    const server = new WebSocket.Server({ port: 5000 });
    server.on("connection", socket => {
      console.log("클라이언트 입장");
      this.connectSocket(socket);
    });
  }

  getSockets() {
    return this.sockets;
  }
  // connectToPeer
  // 클라이언트 입장하면 서버쪽으로 연결 요청시 실행되는 함수
  connectToPeer(newPeer: string) {
    const socket = new WebSocket(newPeer);
    socket.on("open", () => {
      this.connectSocket(socket);
    });
  }

  connectSocket(socket: WebSocket) {
    this.sockets.push(socket);
    this.messageHandler(socket);

    const data: Message = {
      type: MessageType.latest_block,
      payload: {},
    };

    this.errorHandler(socket);

    const send = P2PServer.send(socket);
    send(data);
  }

  messageHandler(socket: WebSocket) {
    const callback = (data: string) => {
      // Message : 통신할때 이벤트들을 구분 처리해주기 위해 만든 타입
      const result: Message = P2PServer.dataParse<Message>(data);
      const send = P2PServer.send(socket);

      switch (result.type) {
        case MessageType.latest_block: {
          const message: Message = {
            type: MessageType.all_block,
            payload: [this.getLatestBlock()],
          };
          send(message);
          break;
        }
        case MessageType.all_block: {
          // 체인에 브록을 추가할지 결정
          const message: Message = {
            type: MessageType.receivedChain,
            payload: this.getChain(),
          };
          send(message);
          break;
        }
        case MessageType.receivedChain: {
          // 체인을 교체하는 코드 -> 값이 더  긴 체인으로 교체
          const receivedChain: IBlock[] = result.payload;
          console.log(receivedChain);
          break;
        }
        default:
          break;
      }
    };
    socket.on("message", callback);
  }
  errorHandler(socket: WebSocket) {
    const close = () => {
      this.sockets.splice(this.sockets.indexOf(socket, 1));
    };
    // 소켓이 연결이 끊겼을때
    socket.on("close", close);
    // 소켓 에러 발생시
    socket.on("error", close);
  }

  handleChainResponse(receivedChain: IBlock[]): Failable<Message | undefined, string> {
    const isValidChain = this.isValidChain(receivedChain);

    if (isValidChain.isError) return { isError: true, value: isValidChain.value };

    const isValid = this.replaceChain(receivedChain);
    if (isValid.isError) return { isError: true, value: isValid.value };

    const message: Message = {
      type: MessageType.receivedChain,
      payload: receivedChain,
    };
    this.broadcast(message);
    return { isError: false, value: undefined };
  }

  broadcast(message: Message) {
    this.sockets.forEach(socket => P2PServer.send(socket)(message));
  }

  static dataParse<T>(data: string): T {
    return JSON.parse(Buffer.from(data).toString());
  }
  static send(socket: WebSocket) {
    return (data: Message) => {
      socket.send(JSON.stringify(data));
    };
  }
}

// p2p.ts 파일에서 P2PServer 클래스가 Chain 상속받고
// 블록체인의 P2P 네트워크에선 네트워크에 참여하는 모든 PC가
// 클라이언트임과 동시에 서버로서의 역할을 담당한다.
// 서버란 개념이 없고 오로지 동등한 계층의 노드들이
// 서로 클라이언트와 서버 역할을 동시에 네트워크에서 하게 된다.
// 그래서 P2P네트워크를 구축할땐 서버 코드랑 클라이언트 코드를 동시에 작성해야 한다.

// P2P 네트워크 상에서 모든 노드들이 서버이면서 동시에 클라이언트이다.
