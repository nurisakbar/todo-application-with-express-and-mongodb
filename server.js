const express 		= require('express');
const app     		= express();
var mongoose = require('mongoose');
const swig 			= require('swig');
const bodyParser 	= require('body-parser');

swig.setDefaults({ cache: false });
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// mongoose area

mongoose.connect('mongodb://localhost/todoAppTest');
var TodoSchema = new mongoose.Schema({
  name: String,
  description: String,
var Todo = mongoose.model('Todo', TodoSchema);

// routing area
app.get('/',function(req,res){
	const data ={
		list : Todo.find(function (err, todos) {
		if (err) return console.error(err);
	  	console.log(todos)
	})
	}
	res.render('index',list);
});

app.get('/create',function(req,res){
	res.render('create');
});

app.post('/store',function(req,res){
  console.log(req.body);
  var todo = new Todo({name: req.body.name, description: req.body.description});
	  todo.save(function(err){
	  if(err)
	    console.log(err);
	  else
	    console.log(todo);
	});
  res.redirect('/');
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});