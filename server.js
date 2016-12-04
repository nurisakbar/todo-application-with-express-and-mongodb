const express 		= require('express');
const app     		= express();
// Load mongoose package
var mongoose = require('mongoose');
const swig 			= require('swig');
const bodyParser 	= require('body-parser');

var methodOverride = require('method-override')
app.use(methodOverride('_method'));


swig.setDefaults({ cache: false });
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/todoAppTest');
// Create a schema
var TodoSchema = new mongoose.Schema({
  name: String,
  description: String,
});
// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);

app.get('/',function(req,res){
		list : Todo.find(function (err, todos) 
		{
		if (err) return console.error(err)
			else
				res.render('index',{list:todos});

	})
	
});

app.get('/create',function(req,res){
	res.render('create');
});

app.post('/store',function(req,res){
  var todo = new Todo({name: req.body.name, description: req.body.description});
	  todo.save(function(err){
	  if(err)
	    console.log(err);
	  else
	    console.log(todo);
	});
  res.redirect('/');
});


app.get('/edit/:id',function(req,res){
	const id = req.params.id;
    const query = {
      _id: id,
    };
	Todo.findOne(query,function (err, result) {
  	if (err) return console.error(err);
  	else
  		res.render('edit',{todo:result})
	})
});

app.post('/update/',function(req,res){
	const query = {
      _id: req.body.id,
    };
    const update = {name: req.body.name, description: req.body.description};
    Todo.findOneAndUpdate(query, update,function(err,result){
    	if(err)
    		console.log(err);
    	else
    		console.log(result);
    });
  res.redirect('/');
});

app.delete('/delete/',function(req,res){
	const query = {
      _id: req.body.id,
    };
    Todo.findOneAndRemove(query,function(err,result){
    	if(err)
    		console.log(err);
    	else
    		console.log(result);
    });
  res.redirect('/');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});