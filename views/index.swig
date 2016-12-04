<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo App</title>
</head>
<body>
<a href="/create">Create New Data</a>
  <h1>Todo List</h1>
<ul>
  {% for item in list %}
    <li>{{ loop.index }} - {{ item.name }}</li>
  {% endfor %}
</ul>
</body>
</html>