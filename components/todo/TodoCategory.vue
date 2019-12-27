<template>
    <div class="todo-category">
        <div class="todo-category__header">
            <font-awesome-icon class="todo-category__icon" :class="[color ? 'color-'+color : '']" :icon="['fas', icon]" />
            <h2 class="todo-category__title">{{ name }}</h2>
            <button type="button" class="todo-category__edit btn btn-round" :class="{'active': edit}" @click="toggleEdit">
                <font-awesome-icon :icon="['fas', 'pen']" />
            </button>
        </div>
        <transition-group name="list-transition">
            <TodoItem
                    v-for="todo in todos"
                    :key="todo.id"
                    :id="todo.id"
                    :name="todo.name"
                    :color="color"
                    :edit="edit"
                    :checked="todo.checked"
            />
        </transition-group>
        <form class="todo-category__add" @submit.prevent="add">
            <AddLoader class="todo-category__add-loader" :class="{'visible' : addLoading}" />
            <input v-model="addInput" class="todo-category__add-input" type="text" placeholder="Ajouter..." ref="add_input"/>
        </form>
    </div>
</template>

<script>
  import TodoItem from './TodoItem'
  import AddLoader from '../loader/AddLoader'
  export default {
    name: 'TodoCategory',
    components: {AddLoader, TodoItem},
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        default: 'list-ul'
      },
      color: {
        type: String,
        default: 'blue'
      }
    },
    data () {
      return {
        addInput: null,
        edit: false,
        addLoading: false
      }
    },
    methods: {
      async add () {
        if(this.addInput !== null && this.addInput.length > 0 && this.addInput !== ' ' && !this.addLoading) {

          this.addLoading = true

          this.$store.dispatch('todos/add', {
            name: this.addInput,
            checked: false,
            CategoryId: this.id
          })
          .then((response) => {
            this.addLoading = false

            // Delete add input text
            this.addInput = null

            // Remove focus of input
            this.$refs.add_input.blur()
          })
          .catch((error) => {
            console.error(error.message)
          })
          .finally(() => {
            this.addLoading = false
          })

        }
      },

      toggleEdit() {
        this.edit = !this.edit
      },
    },
    computed: {
      todos() {
        return this.$store.getters['todos/getTodosByCategoryId'](this.id)
      }
    }
  }
</script>
