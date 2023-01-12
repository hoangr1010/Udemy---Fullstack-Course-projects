var button_array = document.querySelectorAll('.btn')
var ResetButton = button_array[0]
var DecreaseButton = button_array[1]
var IncreaseButton = button_array[2]
var Num = parseInt(document.querySelector('.number').innerHTML)


ResetButton.addEventListener('click', function() {
    Num = 0;
    document.querySelector('.number').innerHTML = Num;
    ColorChange();
})

DecreaseButton.addEventListener('click', function() {
    Num--;
    document.querySelector('.number').innerHTML = Num;
    ColorChange();
})

IncreaseButton.addEventListener('click', function() {
    Num++;
    document.querySelector('.number').innerHTML = Num;
    ColorChange();
})


const ColorChange = () => {
    if (Num > 0) {
        document.querySelector('.number').style.color = 'green'
    } else if (Num < 0) {
        document.querySelector('.number').style.color = 'red'
    } else {
        document.querySelector('.number').style.color = 'black'
    }
}
