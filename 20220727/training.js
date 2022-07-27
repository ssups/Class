// 사용할 모듈
// socket.io, express, fs, nodemon

// 영화관 좌석 예약 만들것

const socketio = require("socket.io");
const express = require("express");
const fs = require("fs");

let seatsData = [];
for (let i = 0; i < 3; i++) {
    seatsData[i] = [
        
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0],

        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],
        
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0],
        
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,1,1,0,0,1,1,1,1,0,0,1,1],
        
    ];
}

console.log(seatsData[0][0][0], "나야");

// 1은 예약 가능한 자리 0은 예약 불가한 자리 예약된 자리는 2로 변경

// 웹 서버 생성
const app = express();
const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(PORT, "번 포트 실행");
});

// socket.io 생성 및 실행
const io = socketio(server);

app.get("/", (req, res) => {
    fs.readFile("training.html", (err, data) => {
        res.send(data.toString());
    });
});

// seats 라는 배열을 /seats페이지에 json 형태로 보내준다.
app.get("/seats", (req, res) => {
    res.send(seatsData);
});
// const url = './images/plane.jpg'
const url = 'https://www.hi-airlines.com/web/hcws/img/sub/planseat.jpg'
app.get("/images",(req,res)=>{
    res.send(url)
})
io.sockets.on("connection", socket => {
    // reserve라는 이름의 이벤트를 만들고
    socket.on("reserve", data => {
        console.log("time:", data.time);
        console.log("x:", data.x);
        console.log("y:", data.y);

        seatsData[data.time][data.y][data.x] = 2;
        // emit을 통해서 reserve라는 이름의 이벤트를 요청한다
        io.sockets.emit("reserve", data);
    });
});
