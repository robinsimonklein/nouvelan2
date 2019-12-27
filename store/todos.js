import axios from '../plugins/axios'

export const state = () => ({
    todos: []
})

export const mutations = {
    add(state, payload) {
        state.todos.push(payload)
    },
    set(state, payload) {
        state.todos = payload
    },
    remove(state, todoId) {
        const index = state.todos.findIndex((todo) => {
            return todo.id === todoId
        });

        state.todos.splice(index, 1)
    },
}

export const getters = {
    getTodos: (state) => state.todos,
    getTodosByCategoryId: (state) => (CategoryId) => {
        return state.todos.filter(todo => todo.CategoryId === CategoryId)
    },
}

export const actions = {
    async add(context, payload) {
        let {data} = await axios.post('/api/todos/add', payload)
        context.commit('add', data)
    },

    async update(context, {todoId, payload}) {
        let {data} = await axios.put(`/api/todos/${todoId}`, payload)
        context.commit('set', data)
    },

    async delete(context, todoId) {
        context.commit('remove', todoId)
        let {data} = await axios.delete('/api/todos/' + todoId)

    },

    async load(context) {
        let {data} = await axios.get('/api/todos')
        context.commit('set', data)
    },
}
