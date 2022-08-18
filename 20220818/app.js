// mysql 편하게 쓰기
// swquelize 사용 그리고 FOREIGN KEY 사용
// 관계형 데이터 베이스 만들어보기

// 지금 사용할 모듈 mysql2
const mysql = require("mysql2");
// config.js에서 내보낸 객체가 담긴다
const config = require("./config");

const client = mysql.createConnection(config.dev);

// const sql = `CREATE TABLE users (id INT AUTO_INCREMENT, user_name
//     varchar(255), PRIMARY KEY (id));`;
// const sql2 = `CREATE TABLE items (id INT AUTO_INCREMENT, name
//     varchar(255), price INT, url varchar(255), PRIMARY KEY (id));`;
// const sql3 = `CREATE TABLE orders (id INT AUTO_INCREMENT, user_id
//     INT, total_price INT, created_at DATETIME, PRIMARY KEY (id));`;
// const sql4 = `CREATE TABLE orders_item (id INT AUTO_INCREMENT, order_id
//     INT, item_id INT, order_at DATETIME, PRIMARY KEY (id));`;
// client.query(sql + sql2 + sql3 + sql4);
// client.query(sql);
// client.query(sql2);
// client.query(sql3);
// client.query(sql4);

// const sql5 =
//     // FOREIGN KEY 추가하는데 orders 테이블의 user_id와 users 테이블의 id(키값)를 연결시킨다.
//     "ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);";
// const sql6 =
//     "ALTER TABLE orders_item ADD FOREIGN KEY (order_id) REFERENCES orders (id);";
// const sql7 =
//     "ALTER TABLE orders_item ADD FOREIGN KEY (item_id) REFERENCES items (id);";
// client.query(sql5+sql6+sql7);

// const sql8 = `INSERT INTO items (name, price, url) VALUES('첫번째', 1000, '/'), ('두번째', 2000, '/');`;
// const sql9 = `INSERT INTO users (user_name) VALUES ('안녕');`;
// client.query(sql8 + sql9);

// SELECT 부분이 찾을 값들 FROM 전까지
// INNER JOIN 두개의 테이블이 공통된 부분만(참조된 것들) 합쳐서 객체로 담아줌
// id, user_id, order_id, item_id 끼리 합쳐짐
// orders_items의 item_id 값이랑 items 테이블의 id 값이랑 같은 값을 합친다.

const sql13 = `SELECT orders.id, orders.created_at,
orders.total_price, items.name, items.price, items.url,
orders_item.order_at FROM items
INNER JOIN orders_item ON (orders_item.item_id = items.id)
INNER JOIN orders ON (orders.id = orders_item.order_id)
WHERE (orders.user_id = ?)`;

client.query(sql13, [1], (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});
