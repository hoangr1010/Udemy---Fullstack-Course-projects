var buttonColours = ['red','blue','green','yellow'];
var gamePattern = []
var userClickedPattern = []

var start = false
var level = 0


$('body').keypress(function() {
    if (!start) {    
        $('h1').text(`Level ${level}`)
        nextSequence()
        start = true
    }
})


$('.btn').click(handler)


function nextSequence() {
    // increase level and display it
    level++
    $('h1').text(`Level ${level}`)
    
    // random new color and push to randomChosenColour
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    console.log(gamePattern)

    // some effect
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour)

    
}



function handler(e) {
    // get the color and append to userChosenColour
    var userChosenColour =  e.target.classList[1]
    userClickedPattern.push(userChosenColour)

    // some effect
    console.log(userClickedPattern)
    playsound(userChosenColour)
    animationPress(userChosenColour)
    
    checkAnswer(userClickedPattern.length-1)
}

// function playsound
function playsound(name) {
    var audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

// function add animation press
function animationPress(currentColour) {
    $(`#${currentColour}`).addClass('pressed')
    setTimeout(function() {
        $(`#${currentColour}`).removeClass('pressed')
    }, 100)
}

// function check the answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log('success')
        if (userClickedPattern.length === gamePattern.length) {
            //new sequence starts
            setTimeout(nextSequence, 1000)

            userClickedPattern = []}
    } else {
        console.log('wrong')

        gameOver()
        startOver()
    }
}

function gameOver() {
    $('body').addClass('game-over')

    var audio = new Audio('sounds/wrong.mp3')
    audio.play()
    setTimeout(function() {
        $('body').removeClass('game-over')
    }, 200)

    $('h1').text('Game Over, Press Any Key to Restart')
}

//start over function
function startOver() {
    level = 0
    gamePattern = []
    userClickedPattern = []
    start = false
}