// 채팅방 만들기
// 방개념

// pack.jason 만들기
// 사용할 것들
// express, socket.io, fs, nodemon

// nodemon은 개발할때만 사용할거니깐
// ===========================
// npm i --dev nodemon
// ===========================

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

// =============express로 서버 열기=============
// 서버의 몸체가 되는 객체만 만들어지고
const app = express();
// 3000번 포트에서 서버가 대기중이게 만듬
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(PORT, "번 포트에 잘 열렸어요!");
});
// ==========================================

// =========socket.io 생성 및 실행=====================================
const io = socketio(server);
// 연동시킬 html파일(프론트)에 script src 경로를 '/socket.io/socket.io.js/' 로 설정해주기
// =================================================================

app.get("/", (req, res) => {
    fs.readFile("page.html", "utf-8", (err, data) => {
        // console.log(err);
        // 파일 읽기가 처리되었으면 err는 null값을 띄운다
        res.send(data);
    });
    // fs.readFile("css.css", (err, data) => {
    //     console.log(err);
    //     res.writeHead()
    //     res.send(data);
    // });
});

// 클라이언트가 접속 했을때 connection
io.on("connection", socket => {
    // console.log(socket);
    console.log("유저 접속");
    socket.on("joinRoom", (room, name) => {
        // io.to() 현재 그 방에있는 클라이언트에게 요청
        socket.join(room); //방개념으로 접속시켜주는 함수 socket.join(방이름)
        // 요건 방으로 들어간다는 개념 보다는
        // 해당 클라이언트한테 room에 들어있는 value값의 classname을 부여해준다는 개념에 더 가깝다
        io.to(room).emit("joinRoom", room, name);
        // 요기서 io는 전체 socket,즉 전체 클라이언트를 의미하고
        // 그뒤에 to()에서 대상 socket,즉 대상 클라이언트의 범위를 정해주는데
        // to('요기')요기 들어가는 값은 위에 join에서 부여해준 classname이 들어가는 거다.
    });
    socket.on("leaveRoom", (room, name) => {
        socket.leave(room); // 방개념으로 떠나게 해주는 함수 socket.leave(방이름)
        io.to(room).emit("leaveRoom", room, name);
    });
    socket.on("chat", (room, name, msgVal) => {
        io.to(room).emit("chat", name, msgVal);
    });
});

// 접속된 모든 클라이언트에게 메세지를 전송
// io.emit('이벤트명', 보내줄 데이터)

// 메세지를 전송한 클라이언트에게만 메세지 전송
// socket.emit('이벤트명',보내줄 데이터)

// 메세지를 전송하는데 자기 제외 방송
// socket.broadcast.emit(')

// 특정 클라이언트에게만 귓속말
// io.to(아이디).emit('이벤트명',data)

// 클라이언트 접속과 종료 들어왔을때 나갔을때
// io.on('connection'(접속했을떄)/'disconnection'(나갔을때),(socket)=>{})
