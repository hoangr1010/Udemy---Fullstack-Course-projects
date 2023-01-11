var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;

console.log(randomNumber1, randomNumber2)

// roll the dice
const image = document.querySelectorAll('img')
image[0].setAttribute('src',`images/dice${randomNumber1}.png`)
image[1].setAttribute('src',`images/dice${randomNumber2}.png`)

// make decision 
if (randomNumber1 === randomNumber2) {
    document.querySelector('h1').innerHTML = 'Draw'
} else if (randomNumber1 > randomNumber2) {
    document.querySelector('h1').innerHTML = 'Player 1 win!'
} else {
    document.querySelector('h1').innerHTML = 'Player 2 win!'
}