// var time = 0;
// var timer = setInterval(function(){
//   time += 2;
//   console.log(time + ' seconds have passed');
//   if(time > 5){
//     clearInterval(timer);
//   }
// }, 2000);


// console.log(__dirname);
// console.log(__filename);


// lesson 5

// function sayHi(){
//   console.log('hi')
// }
//
// sayHi()
//
// var sayBye = function(){
//   console.log('bye')
// }
//
// sayBye()

// function callFunction(fun){
//   fun()
// }
//
// callFunction(sayBye)

// lesson 6

// var counter = require('./count')
// console.log(counter(['shaun','crystal','ryu']))

// lesson 7
//
// var stuff = require('./stuff')
//
// console.log(stuff.counter(['shaun','crystal','ryu']))
// console.log(stuff.adder(5,6))
// console.log(stuff.adder(stuff.pi, 5))

// lesson 8

// var events = require('events')

// var myEmitter = new events.EventEmitter();
//
// myEmitter.on('someEvent', function(msg){
//   console.log(msg)
// })
//
// myEmitter.emit('someEvent', 'the event was emitted')

// var util = require('util')
//
// var Person = function(name){
//   this.name = name
// }
//
// util.inherits(Person, events.EventEmitter)
//
// var james = new Person('james')
// var mary = new Person('mary')
// var ryu = new Person('ryu')
// var people = [james, mary, ryu]
//
// people.forEach(function(person){
//   person.on('speak', function(msg){
//     console.log(person.name + ' said: ' + msg)
//   })
// })
//
//
// james.emit('speak','hey dudes')
// ryu.emit('speak', 'I want a curry')


// lesson 9

// var fs = require('fs')

// var readMe = fs.readFileSync('readMe.txt', 'utf8')
// console.log(readMe)

// fs.writeFileSync('writeMe.txt', readMe)

// fs.readFile('readMe.txt', 'utf8', function(err, data){
//   if(err){
//     console.log(err)
//   }else{
//     fs.writeFile('writeMe.txt', data, (err)=>{
//       if(err) throw err
//       console.log('It is saved!')
//     })
//   }
// })
//
// console.log('test')

// lesson 10
// fs.unlink('writeMe.txt')


// fs.mkdirSync('stuff')
// fs.rmdirSync('stuff')
// fs.mkdir('stuff', function(){
//   fs.readFile('readMe.txt','utf8',function(err, data){
//     fs.writeFile('./stuff/writeMe.txt',data, function(err){})
//   })
// })

// fs.unlink('./stuff/writeMe.txt',function(){
//
//   fs.rmdir('stuff', function(err){})
// })


// lesson 12
// var http = require('http')

// var server = http.createServer(function(request, response){
//   console.log('request was made: ' + request.url)
//   response.writeHead(200, {'Content-Type': 'text/plain'})
//   response.end('Hey ninjas')
// })
//
// server.listen(3000, '127.0.0.1')
// console.log('yo dawgs, now listening to port 3000')

// lesson 14, 15
// var http = require('http')
// var fs = require('fs')
//
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8')
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt')

// myReadStream.on('data',function(chunk){
//   console.log('new chunk received:')
//   // console.log(chunk)
//   myWriteStream.write(chunk)
// })


// lesson 16 - 22

// var http = require('http')
// var fs = require('fs')
//
// var server = http.createServer(function(request, response){
  // console.log('request was made: ' + request.url)
  // response.writeHead(200, {'Content-Type': 'text/html'})
  // var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8')
  // myReadStream.pipe(response)

  // var myObj = {
  //   name:'Ryu',
  //   job:'Ninja',
  //   age: 29
  // }
  // response.end(JSON.stringify(myObj))

  // response.end('feed me popcorn')
//   if(request.url === '/home' || request.url === '/'){
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     fs.createReadStream(__dirname + '/index.html').pipe(response)
//   } else if(request.url === '/contact-us'){
//     response.writeHead(200, {'Content-Type': 'text/html'})
//     fs.createReadStream(__dirname + '/contact.html').pipe(response)
//   } else if(request.url === '/api/ninjas'){
//     var ninjas = [{name:"ryu", age: 29},{name:"yoshi", age: 32}]
//     response.writeHead(200, {'Content-Type':'application/json'})
//     response.end(JSON.stringify(ninjas))
//   } else {
//     response.writeHead(404, {'Content-Type': 'text/html'})
//     fs.createReadStream(__dirname + '/404.html').pipe(response)
//   }
// })

// server.listen(3000, '127.0.0.1')
// console.log('yo dawgs, now listening to port 3000')


// lesson 23 - 25
var express = require('express')
var app = express()

app.set('view engine', 'ejs')

app.get('/', function(req, res){
  // res.send('this is the homepage')
  res.sendFile(__dirname + '/index.html')
})

app.get('/contact', function(req, res){
  // res.send('this is the contact page')
  res.sendFile(__dirname + '/contact.html')
})

app.get('/profile/:name', function(req, res){
  // res.send('You are view the profile of ' + req.params.name)
  var data = {age:29, job: 'ninja'}
  res.render('profile',{person: req.params.name, data:data})
})

app.listen(3000)
