<template>
    <section class="container">
        <div class="row">
            <div
                    class="col-xs-12 col-sm-6 col-md-4"
                    v-for="category in categories"
            >
                <TodoCategory
                        :key="category.id"
                        :id="category.id"
                        :name="category.name"
                        :color="category.color"
                        :icon="category.icon"/>
            </div>
        </div>
    </section>
</template>

<script>
    import TodoCategory from '../components/todo/TodoCategory'

    export default {
        components: {TodoCategory},
        head () {
            return {
                title: 'Nouvel An'
            }
        },

        computed: {
            categories() {
                return this.$store.getters['categories/getCategories']
            }
        },
        beforeMount() {
            this.$store.dispatch('categories/load')
            this.$store.dispatch('todos/load')
        },

        mounted () {
            setInterval(() => {
                this.$store.dispatch('todos/load')
            }, 5000)
        }

    }
</script>
