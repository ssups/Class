// // UI 이벤트

// // load : 페이지와 기타 요소들의 로딩이 완료됐을 때
// // on이 붙으면 어트리뷰트 방식
// // window.onload = function(){
// //     //로드가 완료되고
// //     console.log('페이지가 로드됨')
// //     console.log(document.querySelector('.tag'));
// // };
// document.querySelector('#content').addEventListener('click',function(){
//  console.log('나 클릭됌')
// })

// window.addEventListener('load',function(){
//     // 여기도 로드가 완료되고 실행되는 함수
//     console.log('페이지가 로드됨')
// });

// // 어트리뷰트를 사용하거나
// // window.addEventListener('이벤트의 타입', 함수)를 사용해서
// // 이벤트 핸들러에도 load 이벤트를 등록할 수 있다.

// //resize 브라우저 창의 크기가 바뀌었을때
// window.onresize = function(){
//     console.log('페이지 사이즈가 변했다.')
// };

// window.addEventListener('resize',function(){
//     console.log('페이지 사이즈가 변했다2.')
// })

// // scroll 사용자가 페이지를 스크롤했을 때
// // window.scrollY 브라우저의 스크롤 값 맨위가 0
// window.onscroll = function(){
//     console.log(window.scrollY)
// };

// window.addEventListener('scroll',function(){
//     console.log('나 스크롤됨2')
// });
// ///////////////////////////////////////////////////////

// // 키보드 이벤트 

// // keydown 사용자가 키를 눌렀을 때 누르고 땐게 아니라 누르자 마자
// window.onkeydown = function(){
//     // console.log('키가 입력됨')         
// };

// window.addEventListener('keydown',function(){
//     // console.log('키가 입력됨2')
// });

// window.onkeyup = function(){
//     console.log('키를 땠다')         
// };

// window.addEventListener('keyup',function(){
//     console.log('키를 땠다2')  
// });

// // keypress 사용자가 키를 누르고 있는 동안
// window.onkeypress = function(){
//     console.log('키를 누르는중')
// }

// window.addEventListener('keypress',function(){
//     console.log('키를 누르는중2')  
// });


// ///////////////////////////////////////////////////////

// //마우스 이벤트
// //click 사용자가 페이지위에서 해당 태그에 마우스를 클릭했을때
// content.onclick = function(){
//     // console.log('나 클릭됌')
// };

// content.addEventListener('click',function(){
//     // console.log('나 클릭됌2')  
// });

// //dblclick 더블 클릭 했을때 발동 되는 함수
// content.ondblclick =function ( ) {
//     console.log ('더블클릭됨')
// }

// content.addEventListener('dblclick',function(){
//     console.log ('더블클릭됨2')
// });

// // mousedown 마우스 버튼을 누르자 마자 클릭이 시작 됐을때
// content.onmousedown = function(){
//     console.log('마우스 눌렀음')
// }

// content.addEventListener('mousedown',function(){
//     console.log ('마우스 눌렀음2')
// });

// //mouseup 마우스 버튼을 누르고 땠을때
// // 단일 함수 추가
// content.onmouseup = function(){
//     console.log ('마우스 땠다')
// }
// // 다수로 함수를 추가 할수 있다.
// content.addEventListener('mouseup',function(){
//     console.log ('마우스 땠다2')
// });

// // mousemove 마우스가 움직일 때
// window.onmousemove = function(){
//     // console.log('마우스 움직임')
// }

// content.addEventListener('mousemove',function(){
//     // console.log('마우스 움직임2')
// })

// // mouseenter 마우스가 해당 요소의 위로 올렸을때

// content.onmouseenter = function(){
//     console.log('content에 마우스가 올라감')
// }

// content.addEventListener('mouseenter',function(){
//     console.log('content에 마우스가 올라감2')
// })

// // mouseleave 마우스가 해당 요소를 빠져나갔을때
// content.onmouseleave = function(){
//     console.log('content에 마우스가 나감')
// }
// content.addEventListener('mouseleave',function(){
//     console.log('content에 마우스가 나감2')
// })

// 모바일 터치
// ontouchstart 화면을 눌렀을때
// window.ontouchstart = function(){
//     console.log('모바일 화면이 눌림')
// }

// //touchend 화면에서 손을 땟을 때
// window.ontouchend=function(){
//     console.log('화면에서 손을 땟을 때')
// }

//touchmover 화면에서 터치로 이동할때
window.ontouchmove = function(){
    console.log('터치 이동중');
}

// 드래그 이벤트
//drag 드래그 하고 있을때
window.ondrag = function(){
    console.log('드래그하고 있을때')
}
//dragstart 드래그가 시작 됐을때
window.ondragstart = function(){
    console.log('드래그를 시작했을때')
}
//dragend 드래그가 끝났을때
window.ondragend = function(){
    console.log('드래그를 끝났을때')
}
//dragenter 드래그하면서 요소 위로 마우스가 올라왔을때
window.ondragenter = function(){
    console.log('드래그 엔터')
}
//dragleave드래그하면서 요소 밖으로 나갔을때
window.ondragleave = function(){
    console.log('드래그 밖')
}
//drop 드래그하다가 놓았을때
window.ondrop = function(){
    console.log('드래그를 놨을때')
}


//가위바위보 
//스타트버튼을 하나 만들고
//버튼을 누르면 게임한번 돌려보기

//가위바위보에서 
//스타트 버튼으로 게임을 시작을 하고
//버튼3개 가위 바위 보