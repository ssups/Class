//스크롤 메뉴
window.onscroll = function(){
    let headerContents = document.querySelector('.main_ad')
    if(window.scrollY>headerContents.getBoundingClientRect().top+150){
        if(!(document.querySelector('.scrollMini').classList.contains('active'))){
            document.querySelector('.scrollMini').classList.add('active')
            }
        if(!(document.querySelector('.nav').classList.contains('active'))){
        document.querySelector('.nav').classList.add('active')
        }
    }
    else{
        if((document.querySelector('.scrollMini').classList.contains('active'))){
            document.querySelector('.scrollMini').classList.remove('active')
            }
        if((document.querySelector('.nav').classList.contains('active'))){
            document.querySelector('.nav').classList.remove('active')

        }
    }
}


//스크롤 미니 메뉴
topBtn.onclick = function(){
    window.scrollTo({top:0, behavior:"smooth"})
}

//탑광고
top_ad.onclick = function(){
    top_ad.style.display = 'none'
}


//나브 히든 메뉴
for(let i = 1; i<=6; i++){
    document.querySelector(`.navMenu li:nth-child(${i})`).onmouseenter = function(){
        navHidden.style.height = '407px'
    }
}

document.querySelector('.nav').onmouseleave = function(){
    navHidden.style.height = '0px'
}

//무비차트, 상영예정작 버튼
indexBtnLeft.onclick = function(){
    indexBtnLeft.style.color='black'
    indexBtnRight.style.color='grey'
    chartSwiper.style.display = 'block'
    anotherSwiper.style.display = 'none'

}
indexBtnRight.onclick = function(){
    indexBtnRight.style.color= 'black'
    indexBtnLeft.style.color= 'grey'
    chartSwiper.style.display = 'none'
    anotherSwiper.style.display = 'block'
}

//스와이퍼
var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //특별관

document.querySelector('.hallNames li:first-child').onmouseenter = function(){
    for(let i=1 ; i<=4 ; i++){
        document.querySelector(`.hallImgs img:nth-child(${i})`).style.display ='none' 
        if(document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).classList.contains('active')){
            document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).className-=' active'
        }    
        
    }
    document.querySelector('.hallImgs img:first-child').style.display = 'block'
    document.querySelector('.specialHall .hallNames li:first-child').className+=' active'
}
document.querySelector('.hallNames li:nth-child(2)').onmouseenter = function(){
    for(let i=1 ; i<=4 ; i++){
        document.querySelector(`.hallImgs img:nth-child(${i})`).style.display ='none' 
        if(document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).classList.contains('active')){
            document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).className-=' active'
        }    
        
    }
    document.querySelector('.hallImgs img:nth-child(2)').style.display = 'block'
    document.querySelector('.specialHall .hallNames li:nth-child(2)').className+=' active'
}
document.querySelector('.hallNames li:nth-child(3)').onmouseenter = function(){
    for(let i=1 ; i<=4 ; i++){
        document.querySelector(`.hallImgs img:nth-child(${i})`).style.display ='none' 
        if(document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).classList.contains('active')){
            document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).className-=' active'
        }    
        
    }
    document.querySelector('.hallImgs img:nth-child(3)').style.display = 'block'
    document.querySelector('.specialHall .hallNames li:nth-child(3)').className+=' active'
}
document.querySelector('.hallNames li:last-child').onmouseenter = function(){
    for(let i=1 ; i<=4 ; i++){
        document.querySelector(`.hallImgs img:nth-child(${i})`).style.display ='none' 
        if(document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).classList.contains('active')){
            document.querySelector(`.specialHall .hallNames li:nth-child(${i})`).className-=' active'
        }    
        
    }
    document.querySelector('.hallImgs img:last-child').style.display = 'block'
    document.querySelector('.specialHall .hallNames li:last-child').className+=' active'
    document.querySelector('.specialHall .hallNames li:last-child').className+=' active'
}

