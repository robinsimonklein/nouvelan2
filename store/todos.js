import axios from '../plugins/axios'

export const state = () => ({
  todos: []
})

export const mutations = {
  add (state, payload) {
    state.todos.push(payload)
  },
  set (state, payload) {
    state.todos = payload
  },
  check (state, todoId) {
    const index = state.todos.findIndex((todo) => {
      return todo.id === todoId
    });

    state.todos[index].checked = true
  },
  uncheck (state, todoId) {
    const index = state.todos.findIndex((todo) => {
      return todo.id === todoId
    });

    state.todos[index].checked = false
  },
  remove (state, todoId) {
    const index = state.todos.findIndex((todo) => {
      return todo.id === todoId
    });

    state.todos.splice(index, 1)
  },
}

export const getters = {
  getTodos: (state) => state.todos,
  getTodosByCategoryId: (state) => (idCategory) => {
    return state.todos.filter(todo => todo.idCategory === idCategory)
  },
}

export const actions = {
  async add(context, payload) {
    let { data } = await axios.post('/api/todos/add', payload)
    context.commit('add', data)

  },

  async check(context, todoId) {
    context.commit('check', todoId)
    let { data } = await axios.post('/api/todos/'+todoId+'/check')

  },
  async uncheck(context, todoId) {
    context.commit('uncheck', todoId)
    let { data } = await axios.post('/api/todos/'+todoId+'/uncheck')
  },

  async delete(context, todoId) {
    let { data } = await axios.delete('/api/todos/'+todoId)
    context.commit('remove', todoId)

  },

  async load(context) {
    let { data } = await axios.get('/api/todos')
    context.commit('set', data)
  },

  update(context) {
    console.log('upadate from socket')
  },
}
