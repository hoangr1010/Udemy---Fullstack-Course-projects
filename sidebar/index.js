var sidebar_button = document.querySelector('.sidebar-toggle')
var x_button = document.querySelector('.x-button')

sidebar_button.addEventListener('click', function() {
    document.querySelector('aside').classList.toggle('show-sidebar')
})

x_button.addEventListener('click', function() {
    document.querySelector('aside').classList.remove('show-sidebar')
})

