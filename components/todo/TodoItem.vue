<template>
    <div class="todo-item" @click="toggle">
        <div class="todo-item__checkbox" :class="[{'todo-item__checkbox--checked':checked}, 'todo-item__checkbox-'+color]"></div>
        <div class="todo-item__name">
            {{ name }}
        </div>
        <transition name="zoom-transition">
            <button v-show="edit" type="button" @click="remove" class="todo-item__remove">
                <font-awesome-icon :icon="['fas','trash']"></font-awesome-icon>
            </button>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'TodoItem',
    props: {
      id: Number,
      name: String,
      color: {
        type: String,
        default: 'primary'
      },
      edit: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggle () {
        if(this.edit === true){
          return;
        }
        if(this.checked){
          this.$store.dispatch('todos/update', {
              todoId: this.id,
              payload: {
                  checked: false
              }
          })
        }else {
          this.$store.dispatch('todos/update', {
              todoId: this.id,
              payload: {
                  checked: true
              }
          })
        }
      },
      remove() {
        this.$store.dispatch('todos/delete', this.id)
      }
    }
  }
</script>
