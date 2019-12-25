const { Router } = require('express')

const router = Router()

// Mock Users
const todos = []

/* GET todos listing. */
router.get('/todos', function (req, res, next) {
  res.json(todos)
})

/* ADD todos */
router.post('/todos/add', function (req, res, next) {
  let todoIds = todos.map(todo => todo.id)
  let lastTodoId = 0;
  if(todos.length >= 1) {
    lastTodoId = Math.max(...todoIds)
  }

  let newTodo = req.body

  Object.assign(newTodo, {id: lastTodoId + 1});

  todos.push(newTodo)

  if (req) {
    res.json(newTodo)
    // res.sendStatus(404)
  } else {
    res.sendStatus(404)
  }
})

/* CHECK todos by ID. */
router.post('/todos/:id/check', function (req, res, next) {
  const id = parseInt(req.params.id)

  const index = todos.findIndex((todo) => {
    return todo.id === id
  });

  if (index !== undefined && index !== null && index >= 0) {
    todos[index].checked = true
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

/* UNCHECK todos by ID. */
router.post('/todos/:id/uncheck', function (req, res, next) {
  const id = parseInt(req.params.id)

  const index = todos.findIndex((todo) => {
    return todo.id === id
  });

  if (index !== undefined && index !== null && index >= 0) {
    todos[index].checked = false
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

/* DELETE todos by ID. */
router.delete('/todos/:id', function (req, res, next) {
  const id = parseInt(req.params.id)

  const index = todos.findIndex((todo) => {
    return todo.id === id
  });

  if (index !== undefined && index !== null && index >= 0) {
    todos.splice(index, 1)
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

/* GET todos by ID. */
router.get('/todos/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < todos.length) {
    res.json(todos[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
