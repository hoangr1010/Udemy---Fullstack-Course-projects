const char = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']

const clickBotton = document.querySelector('.btn')

clickBotton.addEventListener('click',function () {
    let backgroundColor = document.querySelector('main')
    let colorHex = document.querySelector('span')

    let corlorHex = colorHexGenerator(char)

    backgroundColor.style.backgroundColor = `#${corlorHex}`;
    colorHex.style.color = `#${corlorHex}`;
    colorHex.innerHTML = `#${corlorHex}`;
})

const colorHexGenerator = (char_array) => {
    var colorHex = '';
    for (var i = 0; i <= 5; i++) {
        var random_char = Math.floor(Math.random() * char_array.length);
        colorHex += char_array[random_char];
    };
    return colorHex;
}

