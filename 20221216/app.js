// 펀딩 컨트렉트 만들어보기
// 이더스캔 하면서 마이닝버튼과 마이닝스탑 만들기

// 처음에 puppeth 폴더 이동해서geth를 먼저 실행하고
// geth --datadir node --http --http.addr "127.0.0.1" --http.port 9000 --http.corsdomain "*"  --http.api "admin,eth,debug,miner,net,txpool,personal,web3" --syncmode full --networkid 7722 --port 30300 --ws --ws.addr "127.0.0.1" --ws.port 9005 --ws.origins "*"  --ws.api "admin,eth,debug,miner,net,txpool,personal,web3"  --allow-insecure-unlock --unlock "0,1" --password "./node/password.txt"
// geth attach http://localhost:9000 이걸로 콘솔창 열어서 쓸수있는 기본 메서드들을 프론트에서 바로 쓸려면 web3 라이브러리 사용했었다.
// 근데 eth. 실행명령어 같은건 web3도 지원해주지만 miner. 같은 명령어는 web3에서 지원을 안해준다.

// 그래서 서버에 post 방식으로 쏘는 방식ㄷ으로 한다.
// curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc" : "2.0", "id" : 1, "method" : "miner_start", "params" : [1]}' localhost:9000
// curl -X POST -H "Content-Type: application/json" --data '{ "jsonrpc":"2.0", "id" : 1, "method" : "miner_stop", "params" : []}' localhost:9000
