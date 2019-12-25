import axios from '../plugins/axios'

export const state = () => ({
  categories: []
})

export const mutations = {
  add (state, payload) {
    state.categories.push(payload)
  },
  set (state, payload) {
    state.categories = payload
  },
  remove (state, {category}) {
    // state.list.splice(state.list.indexOf(category), 1)
  },
}

export const getters = {
  getCategories: (state) => state.categories,
}

export const actions = {
  async load(context) {
    let { data } = await axios.get('/api/categories')
    context.commit('set', data)
  },
}
