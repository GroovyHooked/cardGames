import Deck from './deck.js'

const CARDS_VALUES = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerDeckHTML = document.querySelector('.computerCards')
const playerDeckHTML = document.querySelector('.humanCards')
const computer = document.querySelector('.computerResult')
const player = document.querySelector('.humanResult')
const result = document.querySelector('.result')


let playerDeck, computerDeck, inRound, stop


document.addEventListener('click', ()=>{
    if(stop){
        startGame()
        return
    }
    if(inRound){
        cleanBeforeRound()
    } else {
        flipCards()
    }
})
startGame()
function startGame(){
    const deck = new Deck()
    deck.shuffle()
    const midPoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, midPoint))
    computerDeck = new Deck(deck.cards.slice(midPoint, deck.numberOfCards))
    inRound = false
    stop = false
    cleanBeforeRound()
}
function cleanBeforeRound(){
    inRound =false
    computer.innerHTML = ''
    player.innerHTML = ''
    result.innerText = ''

    updateDeckCount()
}
function flipCards(){
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    player.appendChild(playerCard.getHTML())
    computer.appendChild(computerCard.getHTML())

    updateDeckCount()
    if (whoWon(playerCard, computerCard)){
        result.innerText = 'Win'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if(whoWon(computerCard, playerCard)){
        result.innerText = 'Lose'
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        result.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }
    if(isGameOver(playerDeck)){
        result.innerText = "You Lose !!"
        stop = true
    } else if(isGameOver(computerDeck)){
        result.innerText = "You Win !!"
        stop = true
    }
}
function  updateDeckCount(){
    computerDeckHTML.innerText = computerDeck.numberOfCards
    playerDeckHTML.innerText = playerDeck.numberOfCards
}

function whoWon(cardOne, cardTwo){
    return CARDS_VALUES[cardOne.value] > CARDS_VALUES[cardTwo.value]
}
function isGameOver(deck){
    return deck.numberOfCards === 0
}