

let cards = [];

function cardMachine() {
    let a = 0;
    for (i = 1; i < 14; i++) {
        let heartSlot = [];
        let cloverSlot = [];
        let spadeSlot = [];
        let diamondSlot = [];
        heartSlot.push('♡');
        heartSlot.push(i);
        cloverSlot.push('♧');
        cloverSlot.push(i);
        spadeSlot.push('♤');
        spadeSlot.push(i);
        diamondSlot.push('◇');
        diamondSlot.push(i);
        cards[4 * a] = heartSlot;
        cards[4 * a + 1] = cloverSlot;
        cards[4 * a + 2] = spadeSlot;
        cards[4 * a + 3] = diamondSlot;
        a++;
    }
    return cards
}

cardMachine()
let count = 1;

while (cards.length > 2) {
    console.log(count + "번째 판")
    let random = Math.floor(Math.random() * cards.length)
    let user_card = cards.splice(random, 1)
    random = Math.floor(Math.random() * cards.length)
    let computer_card1 = cards.splice(random, 1)
    random = Math.floor(Math.random() * cards.length)
    let computer_card2 = cards.splice(random, 1)
    let userNumber = Number(user_card[0][1])
    let computerNumber1 = Number(computer_card1[0][1])
    let computerNumber2 = Number(computer_card2[0][1])
    if ((userNumber > computerNumber1 && userNumber < computerNumber2) ||
        (userNumber > computerNumber2 && userNumber < computerNumber1)) {
        alert("성공! 유저카드: <" + user_card[0] + "> 컴퓨터카드: <" + computer_card1[0] + "> <" + computer_card2[0] + ">")
        console.log("성공! 유저카드: ", user_card[0], "컴퓨터카드: ", computer_card1[0], computer_card2[0])
    }
    else {
        alert("실패! 유저카드: <" + user_card[0] + "> 컴퓨터카드: <" + computer_card1[0] + "> <" + computer_card2[0] + ">")
        console.log("실패! 유저카드: ", user_card[0], "컴퓨터카드: ", computer_card1[0], computer_card2[0])
    }
    count++;
}