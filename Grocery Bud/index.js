var form = document.querySelector('.grocery-form')
var groceryInput = document.querySelector('.grocery')
var alert = document.querySelector('p')
var groceryList = document.querySelector('.grocery-list')

form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const id = new Date().getTime().toString()
    if (groceryInput.value === '') {

        showAlert('alert-empty','The box is empty')
        
        setTimeout(function() {
            alert.removeAttribute('class')
            alert.innerHTML = ''
        },400)}

    else {
        value = groceryInput.value

        var child = document.createElement('div')
        child.setAttribute('class', 'grocery-item')
        child.classList.add(id)

        var child_deleteBtn = document.createElement('button')
        child_deleteBtn.setAttribute('class','btn btn-outline-light btn-sm delete')

        var child_deleteBtn_icon = document.createElement('i')
        child_deleteBtn_icon.setAttribute('class','fa fa-trash')

        child_deleteBtn.appendChild(child_deleteBtn_icon)
        child.innerHTML = value
        child.appendChild(child_deleteBtn)

        groceryList.appendChild(child)
        showAlert('alert-added','1 item added successfully')
        
        setToDefault()
        
        // add delete button
        max_index = document.querySelectorAll('.grocery-item').length
        const deleteBtn = document.querySelectorAll('.delete')[max_index-1]

        deleteBtn.addEventListener('click', deleteItem)    
    }
    
    
})

function setToDefault(value) {
    groceryInput.value = ''
    console.log('set to defaut')
}

function deleteItem(e) {
    const item = e.currentTarget.parentElement
    
    groceryList.removeChild(item)
    const grocery_array = document.querySelectorAll('.grocery-item')

    if (grocery_array.length === 0){
        showAlert('alert-empty','The box is empty')
    } else {
        showAlert('alert-deleted','1 item deleted successfully')
    }
}

function showAlert(type, message) {
    alert.setAttribute('class',type)
    alert.innerHTML = message

    setTimeout(function() {
        alert.removeAttribute('class')
        alert.innerHTML = ''
    },400)
}