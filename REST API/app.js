//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true});

//create new schema for wiki
const wikiSchema = mongoose.Schema({
    title: String,
    content: String
})

const Articles = mongoose.model('articles', wikiSchema);


//------------------------------------------------- Requests for all articles --------------------------------

app.route('/articles')
    .get(function (req, res) {
        Articles.find(function (err, articles) {
            if (err) {
                res.send(err);
            } else {
            res.send(articles)
            }
        })
    })
    .post(function(req, res) {
        console.log(req.body.title)
        console.log(req.body.content)
        const newArticle = new Articles({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function(err) {
            if (err) {
                res.send(err)
            } else {
                res.send('Successfully added a new article')
            }
        })
    })
    .delete(function(req, res) {
        Articles.deleteMany(function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully deleted all articles')
            }
        })
    })

//------------------------------------------- Requests targetting a specific article --------------------------------

app.route('/articles/:articleName')
    .get(function(req, res) {
        Articles.findOne({title: req.params.articleName}, function(err, article) {
            if (err) {
                res.send(err)
            } else {
                res.send(article)
            }
        })
    })
    .put(function(req, res) {
        Articles.updateOne(
            {title: req.params.articleName},
            {
                title: req.body.title,
                content: req.body.content
            },
            {upsert: true},
            function(err,) {
                if (err) {
                    res.send(err)
                } else {
                    res.send('successfully overwrite article')
                }
                
            })
        }
        )
        .patch(function(req, res) {
                Articles.updateOne(
                    {title: req.params.articleName},
                    {$set: req.body},
                    function(err) {
                        if (err) {
                            res.send(err)
                        } else {
                            res.send('successfully update article')
                        }
                    }
                )
            }
        )
        .delete(function(req, res) {
            Articles.deleteOne(
                {title: req.params.articleName},
                function(err) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send('successfully delete a article')
                    }
                }
            )
        })






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
