var TodoSchema = new mongoose.Schema({
  name: String,
  description: String,
});
// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);
module.exports.Todo=Todo;