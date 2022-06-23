/*
표 하나 만들어보기
ul li태그 만들어보기
자신의 li 갯수 반환해주는 함수 작성해보기
*/

let UlGnb = (
    function(){
        function UlGnb(amount,name){
            this.init(amount,name) //init함수를 실행시켜주기위해서 필요함
            this.amount = amount //countLi함수는 따로 _ulGnb.countLi() 를 통해서 실행시키기 때문에 이런식으로 전달만 해주면 된다.            
        }
        UlGnb.prototype.init = function(amount,name){
            if(ulGnb === "" || ulGnb === null){return} 
            let temp = document.createElement('ul') 
            ulGnb.appendChild(temp);
            let count = ulGnb.childElementCount
            document.querySelector(`#ulGnb ul:nth-child(${count})`).className = name
            for (let i = 0; i<amount; i++){
                document.querySelector(`.${name}`).appendChild(document.createElement('li'));
            }
        };  
          
        UlGnb.prototype.countLi = function(){ 
            return this.amount
        }
        return UlGnb;
    }
)();

// let UlGnb = (
//     function(){
//         function UlGnb(amount){
//             this.init(amount) //init함수를 실행시켜주기위해서 필요함
//             this.amount = amount //countLi함수는 따로 _ulGnb.countLi() 를 통해서 실행시키기 때문에 이런식으로 전달만 해주면 된다.            
//         }
//         UlGnb.prototype.init = function(amount){
//             if(ulGnb === "" || ulGnb === null){return} 
//             let temp = document.createElement('ul') 
//             ulGnb.appendChild(temp);
//             let count = ulGnb.childElementCount
//             for (let i = 0; i<amount; i++){
//                 document.querySelector(`#ulGnb ul:nth-child(${count})`).appendChild(document.createElement('li'));
//             }
//         };  
          
//         UlGnb.prototype.countLi = function(){ 
//             return this.amount
//         }
//         return UlGnb;
//     }
// )();
