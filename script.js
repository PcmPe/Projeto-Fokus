
//Mudando a cor de fundo
const html = document.querySelector('html')
const focobtt = document.querySelector('.app__card-button--foco')
const curtobtt = document.querySelector('.app__card-button--curto')
const longobtt = document.querySelector('.app__card-button--longo')
const buttons = document.querySelectorAll('.app__card-button')

const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

const timer = document.querySelector('.app__card-timer')
const musicaFoco = document.querySelector('#alternar-musica')
const song = new Audio('./sons/luna-rise-part-one.mp3')
song.loop = true

const startPause = document.querySelector('#start-pause')
const audioPlay = new Audio('./sons/play.wav')
audioPlay.volume = 0.1
const audioPause = new Audio('./sons/pause.mp3')
audioPause.volume = 0.1
const audioEnd = new Audio('./sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const pauseIcon = document.querySelector('#start-pause img')

let tempoDecorridoEmSec = 1500

let intervaloId = null



function alterarContexto(contexto){
    mostrarTempo()
    buttons.forEach( (contexto) => {
        contexto.classList.remove('active')
    }
    )
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
            
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            
            break;
                
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

            break;
                    
        default: 
            break;
                    
            }
        }

musicaFoco.addEventListener('change', () => {
    if(song.paused) {
        song.play()
        song.volume = 0.2
    } else {
        song.pause()
    }
})

focobtt.addEventListener('click', () => {
    tempoDecorridoEmSec = 1500
    alterarContexto('foco')
    focobtt.classList.add('active')
})

curtobtt.addEventListener('click', () => {
    tempoDecorridoEmSec = 300
    alterarContexto('descanso-curto')
    curtobtt.classList.add('active')
})

longobtt.addEventListener('click', () => {
    tempoDecorridoEmSec = 900
    alterarContexto('descanso-longo')
    longobtt.classList.add('active')
})

startPause.addEventListener('click', iniciar_Pausar)



const countdownTimer = () => {
    if(tempoDecorridoEmSec <= 0) {
        clearInterval(intervaloId)
        audioEnd.play()
        alert('Tempo finalizado!')
        return
    } 
        tempoDecorridoEmSec--
        mostrarTempo()
        
}


function iniciar_Pausar() {
    if(intervaloId){
        onPause()
        return
    } 
    onPlay()
    
}

function onPause() {
    clearInterval(intervaloId)
    intervaloId = null
    audioPause.play()
    iniciarOuPausarBt.textContent = 'Começar'
    pauseIcon.setAttribute('src', './imagens/play_arrow.png')
    
}

function onPlay() {
    iniciarOuPausarBt.textContent = 'Pausar'
    intervaloId = setInterval(countdownTimer, 1000)
    audioPlay.play()
    pauseIcon.setAttribute('src', './imagens/pause.png')
    
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSec * 1000)
    tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute : '2-digit', second : '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()