var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to database
mongoose.connect("mongodb+srv://nsmokva:nsmokva12@cluster0-wgok7.mongodb.net/nina?retryWrites=true&w=majority", {useNewUrlParser: true })

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema)

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app){

app.get('/todo', function(req, res){
    //get data from mongodband pass it to the view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todos: data});
    })
});

app.post('/todo', urlencodedParser, function(req, res){
    //get data form the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    })
});

app.delete('/todo/:item', function(req, res){
    //delete the requested item form mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    })
});

};