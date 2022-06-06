//principais variaveis do jogo
const divInicio = document.querySelector('.inicio-game');
const divReiniciar = document.querySelector('.reiniciar-game');
const mario = document.querySelector('.mario');
const cano = document.querySelector('.cano');
const plantas = document.querySelector('.plantas');
const clouds = document.querySelector('.clouds');
const musica = document.getElementById('musica');
const gameover = document.getElementById('somGameover');
const pulo = document.getElementById('pulo');
const p = document.querySelector('.score');
const scoreDiv = document.querySelector('.score-div');
const timer = document.querySelector('.timer');
var interval, pts = 0;
let isJumping = false;
let seconds = 0;  
let minutes = 0;

//musica de fundo
musica.addEventListener("ended", function(){ 

    musica.currentTime = 0; 
    musica.play(); 

}, false);

//configuração da tecla ESPAÇO para pular, quando a tecla sobe, a função jump é chamada (caso não esteja pulando)
function handleKeyup(event){    

    if (event.keyCode === 32){

        if (!isJumping){

            jump();

        }
    }
}

//função de pulo, vai checar a cada 1s (tempo da animação no CSS) se está pulando ou não, se não pressionar para pular, remove a class jump, se pressionar, adiciona a classe jump.
const jump = () => {
    
    isJumping = true;

    pulo.volume = 0.1;
    pulo.currentTime = 0; 
    pulo.play(); 

    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

        isJumping = false;

    }, 1000)
}

//função que começo o jogo
function startGame(){

    divInicio.style.display = 'none'
    clouds.classList.add('animacao-clouds');
    cano.classList.add('animacao-cano');
    plantas.classList.add('animacao-plantas');

    musica.volume = 0.2;
    musica.play();

    score();
    randomEnimies();
    timerGame();
}

//função que marca a pontuação, checa a cada 3s (tempo da animação do cano no CSS) a condição e soma o ponto caso ela tenha sido satisfeita.
function score(){

    interval = setInterval(() => {   
    
    const canoPosition = cano.offsetLeft;
    

     if(canoPosition > 1){

        ++pts; 
        p.innerHTML = 'Score: ' +pts;
        scoreDiv.innerHTML = 'Score: ' +pts;
        randomEnimies();

    }
}, 3000)
}

//função que sorteia aleatoriamente os inimigos
function randomEnimies(){

        let enimiesImg = ['/imgs/inimigo1.gif', '/imgs/inimigo5.png', 'imgs/cano.png', 'imgs/inimigo2.gif', 'imgs/inimigo3.gif', 'imgs/inimigo4.gif', 'imgs/inimigo6.gif'];
        let random = Math.floor(Math.random() * enimiesImg.length);

         switch(random){
            case 0:
                cano.style.width = 70 + 'px';
                cano.style.height = 130 + 'px';
                cano.style.bottom = -10 + 'px';
                cano.src = enimiesImg[0];
                break;
            case 1:
                cano.style.height = '';
                cano.style.bottom = 5 + 'px';
                cano.style.width = 70 + 'px';
                cano.src = enimiesImg[1];
                break;
            case 2:
                cano.style.height = '';
                cano.style.width = 70 + 'px';
                cano.style.bottom = 0 + 'px';
                cano.src = enimiesImg[2];
                break;
            case 3:
                cano.style.height = 80 + 'px';
                cano.style.width = 70 + 'px';
                cano.style.bottom = -10 + 'px';
                cano.src = enimiesImg[3];
                break;
            case 4:
                cano.style.height = '';
                cano.style.width = 50 + 'px';
                cano.style.bottom = 10 + 'px';
                cano.src = enimiesImg[4];
                break;
            case 5:
                cano.style.height = 80 + 'px';
                cano.style.width = 70 + 'px';
                cano.style.bottom = 0 + 'px';
                cano.src = enimiesImg[5];
                break;
            case 6:
                cano.style.height = '';
                cano.style.width = 70 + 'px';
                cano.style.bottom = 0 + 'px';
                cano.src = enimiesImg[6];
                break;
        }
}

// função que checa a cada 10ms se o inimigo atingiu o mario antes dele pular ou está embaixo dele quando ele estiver caindo, se sim, game over
function check(){

    const check = setInterval(() => {

        const canoPosition = cano.offsetLeft;
        const isNumber = parseInt(canoPosition);
        const marioPostion = parseFloat(window.getComputedStyle(mario).bottom);
        const cloudsPosition = parseFloat(clouds.offsetLeft);
        const plantasPosition = parseFloat(plantas.offsetLeft);
        
        if(canoPosition <= 80 && canoPosition > 0 && marioPostion < 70){
    
            cano.classList.remove('animacao-cano');
            cano.style.left = isNumber + 'px';
    
            mario.src = 'imgs/game-over.png';
    
            mario.style.width = 40 + 'px';
            mario.classList.remove('jump')
            mario.style.bottom = marioPostion + 'px';
            mario.style.marginLeft = 40 + 'px';
    
            clouds.classList.remove('animacao-clouds');
            clouds.style.left = cloudsPosition + 'px';

            plantas.classList.remove('animacao-plantas');
            plantas.style.left = plantasPosition + 'px';
    
            divReiniciar.style.display = 'block';

            p.innerHTML = '';
    
            musica.pause();
            gameover.volume = 0.1;
            gameover.currentTime = 0; 
            gameover.play();
    
            clearInterval(check);
            clearInterval(interval);
            clearInterval(clock);
        }
    }, 10)
}

check();

//cronometro do jogo
function timerGame(){

   clock = setInterval(() => {


        ++seconds;

        timer.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

        if(seconds == 59){

            seconds = 0;
            minutes++;

        }

    },1000)

}


//função que reinicia o jogo quando da game over
function restart(){

    mario.classList.remove('jump');

    mario.src = 'imgs/mario.gif';
    mario.style.width = 100 + 'px';
    mario.style.bottom = 0 + 'px';
    mario.style.marginLeft = 0 + 'px';    
    
    cano.classList.add('animacao-cano');
    cano.style.left = '';

    p.innerHTML = 'Score: 0';

    timer.innerHTML = '00:00';
    seconds = 0;  
    minutes = 0;
    
    scoreDiv.innerHTML = 'Score: 0';

    clouds.style.left = -380 + 'px';
    clouds.classList.add('animacao-clouds');

    plantas.style.left = -530 + 'px';
    plantas.classList.add('animacao-plantas');

    divReiniciar.style.display = 'none'; 
    
    gameover.pause();
    
    musica.currentTime = 0; 
    musica.volume = 0.2;
    musica.play();

    pulo.pause(); 

    pts = 0;
    check(); 
    score();
    timerGame();
}

//quando a tecla espaço subir, a função handleKeyup é chamada.
document.addEventListener('keyup', handleKeyup);