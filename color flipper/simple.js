const colors = ['green','red','rgba(133,122,200)', '#f15025']

const clickBotton = document.querySelector('.btn')

clickBotton.addEventListener('click',function(){
    let backgroundElement = document.querySelector('main');
    let colorHex = document.querySelector('span');
    
    let randomColorHex = randomColor(colors)

    backgroundElement.style.backgroundColor = randomColorHex;
    colorHex.innerHTML = randomColorHex;
    colorHex.style.color = randomColorHex;

})

const randomColor = (color_array) => {
    let randomIndex= Math.floor(Math.random()*color_array.length)
    return color_array[randomIndex]
}


