import ancientsData from '../data/ancients.js' 
import * as cardsData from '../data/mythicCards/index.js'

let currentAncient = ancientsData[0]

const blueCards = cardsData.blueCards
const brownCards = cardsData.brownCards
const greenCards = cardsData.greenCards

let firstStage = []
let secondStage = []
let thirdStage = []
let difficulty = 0

const shuffleCards = (a, b) => Math.random() - 0.5;

const createDeck = () => {
    firstStage = []
    secondStage = []
    thirdStage = []
    let tempBlue = [...blueCards]
    let tempBrown = [...brownCards]
    let tempGreen = [...greenCards]
    switch (difficulty) {
        case 1:
            tempBlue = [...tempBlue.filter(el => el.difficulty === 'easy').sort(shuffleCards), 
            ...tempBlue.filter(el => el.difficulty === 'normal').sort(shuffleCards)]
            tempBrown = [...tempBrown.filter(el => el.difficulty === 'easy').sort(shuffleCards), 
            ...tempBrown.filter(el => el.difficulty === 'normal').sort(shuffleCards)]
            tempGreen = [...tempGreen.filter(el => el.difficulty === 'easy').sort(shuffleCards), 
            ...tempGreen.filter(el => el.difficulty === 'normal').sort(shuffleCards)]
            break
        case 2:
            tempBlue = [...tempBlue.filter(el => el.difficulty !== 'hard').sort(shuffleCards)]
            tempBrown = [...tempBrown.filter(el => el.difficulty !== 'hard').sort(shuffleCards)]
            tempGreen = [...tempGreen.filter(el => el.difficulty !== 'hard').sort(shuffleCards)]
            break
        case 4:    
            tempBlue = [...tempBlue.filter(el => el.difficulty !== 'easy').sort(shuffleCards)]
            tempBrown = [...tempBrown.filter(el => el.difficulty !== 'easy').sort(shuffleCards)]
            tempGreen = [...tempGreen.filter(el => el.difficulty !== 'easy').sort(shuffleCards)]
            break
        case 5: 
            tempBlue = [...tempBlue.filter(el => el.difficulty === 'hard').sort(shuffleCards), 
            ...tempBlue.filter(el => el.difficulty === 'normal').sort(shuffleCards)]
            tempBrown = [...tempBrown.filter(el => el.difficulty === 'hard').sort(shuffleCards), 
            ...tempBrown.filter(el => el.difficulty === 'normal').sort(shuffleCards)]
            tempGreen = [...tempGreen.filter(el => el.difficulty === 'hard').sort(shuffleCards), 
            ...tempGreen.filter(el => el.difficulty === 'normal').sort(shuffleCards)]
            break
        default:
            tempBlue.sort(shuffleCards)
            tempBrown.sort(shuffleCards)
            tempGreen.sort(shuffleCards)
            break
    }    
    for (let i = 0; i < currentAncient.firstStage.blueCards; i++) {
        firstStage.push(tempBlue[0])
        tempBlue.shift()
    }
    for (let i = 0; i < currentAncient.firstStage.brownCards; i++) {
        firstStage.push(tempBrown[0])
        tempBrown.shift()
    }
    for (let i = 0; i < currentAncient.firstStage.greenCards; i++) {
        firstStage.push(tempGreen[0])
        tempGreen.shift()
    }
    for (let i = 0; i < currentAncient.secondStage.blueCards; i++) {
        secondStage.push(tempBlue[0])
        tempBlue.shift()
    }
    for (let i = 0; i < currentAncient.secondStage.brownCards; i++) {
        secondStage.push(tempBrown[0])
        tempBrown.shift()
    }
    for (let i = 0; i < currentAncient.secondStage.greenCards; i++) {
        secondStage.push(tempGreen[0])
        tempGreen.shift()
    }
    for (let i = 0; i < currentAncient.thirdStage.blueCards; i++) {
        thirdStage.push(tempBlue[0])
        tempBlue.shift()
    }
    for (let i = 0; i < currentAncient.thirdStage.brownCards; i++) {
        thirdStage.push(tempBrown[0])
        tempBrown.shift()
    }
    for (let i = 0; i < currentAncient.thirdStage.greenCards; i++) {
        thirdStage.push(tempGreen[0])
        tempGreen.shift()
    }
    firstStage.sort(shuffleCards)
    secondStage.sort(shuffleCards)
    thirdStage.sort(shuffleCards)
    console.log(firstStage)
    console.log(secondStage)
    console.log(thirdStage)
}

const ancients = [...document.querySelectorAll('.ancient')]
const dots = [...document.querySelectorAll('.dot')]
const difficultyLevels = [...document.querySelectorAll('.difficulty')]
const stageTexts = [...document.querySelectorAll('.stage-text')] 
let isBeggining = true
ancients.map((el, i) => {
    el.addEventListener('click', ()=>{
        ancients.map(el => el.classList.remove('selected-ancient'))
        currentAncient = ancientsData[i]
        el.classList.add('selected-ancient')
        document.querySelector('.difficulty-container').classList.add('show-block')
        document.querySelector('.deck-container').classList.remove('show-deck')
        if (!isBeggining) {
            document.querySelector('.shuffle-container').classList.add('show-block')
        }
        
    })
})
difficultyLevels.map((el, i) => {
    el.addEventListener('click', ()=>{
        isBeggining = false
        difficultyLevels.map(el => el.classList.remove('selected-difficulty'))
        el.classList.add('selected-difficulty')
        difficulty = i + 1
        document.querySelector('.shuffle-container').classList.add('show-block')
        document.querySelector('.deck-container').classList.remove('show-deck')
    })
})
let cards = []
let allCardsCount = 0
document.querySelector('.shuffle-button').addEventListener('click', () => {
    let deck = document.querySelector('.cards-containter')
    cards = []
    let allCards = [...document.getElementsByClassName('card')]
    allCards.map(el => deck.removeChild(el))
    allCardsCount = 0
    dots[0].textContent = currentAncient.firstStage.greenCards
    dots[1].textContent = currentAncient.firstStage.brownCards
    dots[2].textContent = currentAncient.firstStage.blueCards
    dots[3].textContent = currentAncient.secondStage.greenCards
    dots[4].textContent = currentAncient.secondStage.brownCards
    dots[5].textContent = currentAncient.secondStage.blueCards
    dots[6].textContent = currentAncient.thirdStage.greenCards
    dots[7].textContent = currentAncient.thirdStage.brownCards
    dots[8].textContent = currentAncient.thirdStage.blueCards
    stageTexts.map(el => el.classList.remove('stage-finished'))
    document.querySelector('.shuffle-container').classList.remove('show-block')
    document.querySelector('.deck-container').classList.add('show-deck')
    document.querySelector('.deck-front').classList.remove('move-card')
    createDeck()
    firstStage.map(el => {
        const cardDiv = document.createElement('div')
        cardDiv.setAttribute('class', 'card')
        cardDiv.style.backgroundImage = `url(./assets/MythicCards/${el.color}/${el.id}.webp)`
        deck.appendChild(cardDiv)
        cards.push(cardDiv)
    })
    secondStage.map(el => {
        const cardDiv = document.createElement('div')
        cardDiv.setAttribute('class', 'card')
        cardDiv.style.backgroundImage = `url(./assets/MythicCards/${el.color}/${el.id}.webp)`
        deck.appendChild(cardDiv)
        cards.push(cardDiv)
    })
    thirdStage.map(el => {
        const cardDiv = document.createElement('div')
        cardDiv.setAttribute('class', 'card')
        cardDiv.style.backgroundImage = `url(./assets/MythicCards/${el.color}/${el.id}.webp)`
        deck.appendChild(cardDiv)
        cards.push(cardDiv)
    })
})

let cardMoved = false
document.querySelector('.deck-front').addEventListener('click', ()=>{
    if (firstStage.length === 0 && secondStage.length === 0 && thirdStage.length === 0) {
        document.querySelector('.deck-front').classList.add('move-card')
    } else {
        cards[allCardsCount].classList.add('move-card')
    }
    if (firstStage.length !== 0) {
        cardMoved = true
        switch (firstStage[0].color) {
            case 'green':
                dots[0].textContent = dots[0].textContent - 1
                break
            case 'brown':
                dots[1].textContent = dots[1].textContent - 1
                break
            case 'blue':
                dots[2].textContent = dots[2].textContent - 1
                break
        }
        firstStage.shift()
        if (firstStage.length === 0) {stageTexts[0].classList.add('stage-finished')}
    } 
    if (secondStage.length !== 0 && firstStage.length === 0 && !cardMoved) {
        cardMoved = true
        switch (secondStage[0].color) {
            case 'green':
                dots[3].textContent = dots[3].textContent - 1
                break
            case 'brown':
                dots[4].textContent = dots[4].textContent - 1
                break
            case 'blue':
                dots[5].textContent = dots[5].textContent - 1
                break
        }
        secondStage.shift()
        if (secondStage.length === 0) {stageTexts[1].classList.add('stage-finished')}
    } 
    if (thirdStage.length !== 0 && firstStage.length === 0 && secondStage.length === 0 && !cardMoved) {
        cardMoved = true
        switch (thirdStage[0].color) {
            case 'green':
                dots[6].textContent = dots[6].textContent - 1
                break
            case 'brown':
                dots[7].textContent = dots[7].textContent - 1
                break
            case 'blue':
                dots[8].textContent = dots[8].textContent - 1
                break
        }
        thirdStage.shift()
        if (thirdStage.length === 0) {stageTexts[2].classList.add('stage-finished')}
    } 
    
    cardMoved = false
    allCardsCount++
})
