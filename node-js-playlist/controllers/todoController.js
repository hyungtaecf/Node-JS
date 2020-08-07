var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// Connect to the database
mongoose.connect('mongodb+srv://test:test@liberload.9folt.gcp.mongodb.net/todos?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true })

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved')
// })

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app){
  app.get('/todo', function(req, res){
    // res.render('todo', data)
    // res.render('todo', {todos: data})

    // get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){ // {} Retrieves all the items in a collection
      if(err) throw err;
      res.render('todo',{todos:data})
    })
  })

  app.post('/todo', urlencodedParser, function(req, res){
    // data.push(req.body)
    // res.json({todos: data})

    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err
      res.json(data)
    })

  })

  app.delete('/todo/:item', function(req, res){
    // data = data.filter(function(todo){
    //   console.log(req.params.item+' : '+todo.item.replace(/ /g, '-') !== req.params.item)
    //   return todo.item.replace(/ /g, '-') !== req.params.item
    // })
    // res.json(data)

    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
      if(err) throw err;
      res.json(data)
    })
  })
}
