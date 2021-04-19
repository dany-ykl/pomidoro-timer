var buttonArrow = document.querySelector('.arrow');
var infoScreen = document.querySelector('.info-screen');
var minute = document.getElementById('minute');
var buttonStart = document.getElementById('start');


buttonArrow.addEventListener ('mouseover', function (e) {
    infoScreen.style.display = 'block';
});

infoScreen.addEventListener ('mouseleave', function (e) {
    infoScreen.style.display = 'none';
});

document.querySelector('.button-reload').addEventListener ('click', function () {
    window.location.reload();
}); 

var minusDuration = document.getElementById('minus-duration');
minusDuration.addEventListener ('click', function (e) {
    if (document.getElementById('info-duration').value > 0) { 
    --document.getElementById('info-duration').value;
    }
});

var plusDuration = document.getElementById('plus-duration');
plusDuration.addEventListener ('click', function () {
    ++document.getElementById('info-duration').value;
});


var minusPause = document.getElementById('minus-pause');
minusPause.addEventListener ('click', function () {
    if (document.getElementById('info-pause').value > 0) {
    --document.getElementById('info-pause').value;
    }
});


var plusPause = document.getElementById('plus-pause');
plusPause.addEventListener ('click', function () {
    ++document.getElementById('info-pause').value;
});

var minusBreak = document.getElementById('minus-break');
minusBreak.addEventListener ('click', function () {
    if (document.getElementById('info-break').value > 0) {
    --document.getElementById('info-break').value;
    }
});

var plusBreak = document.getElementById('plus-break');
plusBreak.addEventListener ('click', function () {
    ++document.getElementById('info-break').value;
});


var count = 0;
var numImg = 0;

var sound = true;

function soundClick () {
    if (sound) {
    let audio = new Audio();
    audio.src = 'audio/notification.mp3'
    audio.autoplay = true;
    } else return;
};



function replaceImg () {
    let listImg = document.querySelectorAll('.img')
     for (let i of listImg) {
         i.src = 'img/tomato-0.png'
     };
};

function replaceNow (what) {
    let nowSpan = document.getElementById('now');
    nowSpan.innerHTML = what;
};



function timerBreak() {

    replaceNow('Перерыв');
    
    let durBreak = document.getElementById('info-break').value;
    let endBreak = new Date().getTime() + (durBreak * 60000);

    timerB = setInterval(() => {
 
        let dedline = endBreak - new Date().getTime();

        if (dedline >= 0) {

            let mins = Math.floor((dedline % (3600000)) / (60000)).toString();
            let secs = Math.floor((dedline % (60000)) / 1000).toString();

            if (mins.length < 2) mins = '0' + mins;
            if (secs.length < 2) secs = '0' + secs;

            let str = mins + ":" + secs;
            minute.textContent = str;
            document.title = str + ' - Перерыв';

        }
    }, 1000);

    setTimeout(() => {
        soundClick();
        clearInterval(timerB);
        window.location.reload();
    }, durBreak * 60000);
};


function timerPause() {
    
    replaceNow('Пауза');
    

    let durPause = document.getElementById('info-pause').value;
    let endPause = new Date().getTime() + (durPause * 60000);
    
    timerP = setInterval (() => {
        
        let dedline = endPause - new Date().getTime();

        if (dedline >= 0) {

            let mins = Math.floor((dedline % (3600000)) / (60000)).toString();
            let secs = Math.floor((dedline % (60000)) / 1000).toString();

            if (mins.length < 2) mins = '0' + mins;
            if (secs.length < 2) secs = '0' + secs;

            let str = mins + ":" + secs;
            minute.textContent = str;
            document.title = str + '- Пауза';
        }
    }, 1000);
    
    setTimeout (() => {
        soundClick();
        clearInterval(timerP);
        minute.innerHTML = '';
        timerTomato();
    }, durPause * 60000);


        
};


function timerTomato () {
    
    count ++;
    numImg ++;

    
    replaceNow('Работа');

    let durTomato = document.getElementById('info-duration').value;
    let dateEnd = new Date().getTime() + (durTomato * 60000);
    

    timerT = setInterval (() => {
        let dedline = dateEnd - new Date().getTime();

        if (dedline >= 0) {

            let mins = Math.floor((dedline % (3600000)) / (60000)).toString();
            let secs = Math.floor((dedline % (60000)) / 1000).toString();

            if (mins.length < 2) mins = '0' + mins;
            if (secs.length < 2) secs = '0' + secs;

            let str = mins + ":" + secs;
            minute.textContent = str;
            document.title = str + ' - Работа';
        }
    }, 1000);

    setTimeout (() => {
        soundClick();
        clearInterval(timerT);
        document.getElementById(`img-${numImg}`).src = 'img/tomato.png';
        minute.innerHTML = '';
        if (count != 4) timerPause();
        if (count == 4) timerBreak();
    }, durTomato * 60000);

};


    

buttonStart.addEventListener ('click', function () {
    timerTomato();
});

var soundButton = true;

var buttonSoundOn = document.getElementById('img-sound');
buttonSoundOn.addEventListener ('click', function () {

    if (soundButton) {
    sound = false;
    soundButton = false;
    buttonSoundOn.src = 'img/sound-off.png';
    } else {
        sound = true;
        buttonSoundOn.src = 'img/sound-on.png';
        soundButton = true;
    } 
});



