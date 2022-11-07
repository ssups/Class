import { WebSocket } from "ws";
import { Chain } from "@core/blockChain/chain";

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
    socket.on("message", (data: string) => {
      console.log(data);
    });
  }
}

// p2p.ts 파일에서 P2PServer 클래스가 Chain 상속받고
// 블록체인의 P2P 네트워크에선 네트워크에 참여하는 모든 PC가
// 클라이언트임과 동시에 서버로서의 역할을 담당한다.
// 서버란 개념이 없고 오로지 동등한 계층의 노드들이
// 서로 클라이언트와 서버 역할을 동시에 네트워크에서 하게 된다.
// 그래서 P2P네트워크를 구축할땐 서버 코드랑 클라이언트 코드를 동시에 작성해야 한다.

// P2P 네트워크 상에서 모든 노드들이 서버이면서 동시에 클라이언트이다.
