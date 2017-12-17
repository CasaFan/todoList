var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({extended: false});

var app = express();

//set session
app.use(session({secret: 'secretDeTODOlist'}))

//init todo-list if not exist
.use(function(req, res, next){
    if(typeof(req.session.todolist) == 'undefined'){
        req.session.todolist = [];
    }
    next();
})

//set router
.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous etes à l\'accueil de TODO-List');
})

.get('/todo', function (req, res) {
    res.render('todo.ejs', {todolist:req.session.todolist});
})

.post('/todo/ajouter/', urlEncodeParser, function (req, res) {
    if(req.body.newTodo !=''){
        req.session.todolist.push(req.body.newTodo);
    }
    res.redirect('/todo');
})

.get('/todo/supprimer/:id', function (req, res) {
    if(req.params.id != ''){
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);