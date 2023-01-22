const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const ejs = require('ejs');
const app = express();
var _ = require('lodash')


app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use(express.static('public'))


// items = []
// Connect to MongoDB 
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://hoanglui:powerteam@cluster0.lpi2k1o.mongodb.net/todoDB", { useNewUrlParser: true});

// Create todolist Schema and create new collection
const todoSchema = new mongoose.Schema({
    name: String
})

const todoCollection = mongoose.model('todoCollection', todoSchema);

// Create customList Schema and create new collection
const customSchema = new mongoose.Schema({
    name: String,
    list: [todoSchema] 
})

const customCollection = mongoose.model('customCollection', customSchema)

//Test to insert sth into todoDB
const item1 = {name: "welcome to my todoList"}
const item2 = {name: "Write sth you want do here"}
const item3 = {name: "<-- click here to delete your item"}

defaultItems = [item1, item2, item3]

//define date
let now = getDate()


//get request
app.get('/', function(req, res) {

    // response with data from mongoose
    todoCollection.find(function(err, todoItems) {
        if (err) {
            console.log(err)
        } else {
            if (todoItems.length == 0) {
                insertDefault();
                res.redirect('/')
            } else {
                res.render('list', {today: now, job: todoItems, page: 'root'})
            }
        }
    })
})

app.get('/:page', function(req, res) {
    let page = _.capitalize(req.params.page)
    customCollection.findOne({name: page}, function(err, listItems) {
        if (err) {
            console.log(err)
        } else {
            if (listItems) {
                console.log('exist')
                //show the data, render it 
                res.render('list', {today: now, job: listItems.list, page: listItems.name})
            } else {
                console.log('not exist')
                // create a new page with default list
                addNewList(page, defaultItems)
                console.log('create new page')
                res.redirect('/'+page)
            }
        }
    })
})

// This bunch for post
app.post('/', function(req, res) {
    //
    var currentPage = req.body.button
    var item = req.body.todoList

    if (currentPage === 'root') {
        insertSingle(item)
        res.redirect('/')
    } else {
        updateNewItem(currentPage, item)
        res.redirect('/' + currentPage)
    }

})

app.post('/delete', function(req, res) {
    currentPage = req.body.page
    itemId = req.body.delete

    if (currentPage === 'root') {
        deleteSingle(req.body.delete)
        res.redirect('/')
    } else {
        deleteItem(currentPage, itemId)
        res.redirect('/' + currentPage)
    }

    
})





app.listen(process.env.PORT || 3000, function () {
    console.log('listening on 3000')
})




//---------------------------------------------------------------- functionality ----------------------------------------------------------------

//function get date with customized customer
function getDate() {
    option = {
        weekday:'long',
        year:'numeric',
        month:'short',
        day:'numeric'
    }
    var now = new Date().toLocaleDateString('en-us', option)
    return now
}

//function insert default item 
function insertDefault() {
    todoCollection.insertMany(defaultItems, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('successfully insert default todoList')
        }
    })
}

//function insert single item
function insertSingle(todoValue) {
    const items = new todoCollection ({
        name: todoValue
    })
    items.save()
    console.log('successfully update new item in root page')
}

//function to delete item
function deleteSingle(itemId) {
    todoCollection.deleteOne({_id: itemId}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('successfully delete an item')
        }
    })
}

// function insert into customList
function addNewList(page, list) {
    const customList = new customCollection ({
        name: page,
        list: list
    })
    customList.save()
}

//function update new item in a page for customList
function updateNewItem(page, item) {
    query = {'name': page}
    customCollection.findOneAndUpdate(query, {$push: 
            {'list':
                {'name': item}
            }
        }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('successfully update new item in ' + page + 'page')
            }
        })
}

//function delete item in customList
function deleteItem(page, itemId) {
    query = {'name': page}
    customCollection.findOneAndUpdate(query, 
        {$pull: 
            {'list': 
                {'_id': itemId}
            }
        }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('successfully delete item in ' + page + 'page')
            }
        }
    )
}
