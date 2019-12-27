<template>
    <div class="container">
        <div class="row">
            <div class="col col-12 col-md-8 col-md-offset-2">
                <form @submit.prevent="add" class="categories-form">
                    <input type="text" name="name" placeholder="name" v-model="name"/>
                    <input type="text" name="slug" placeholder="slug" v-model="slug"/>
                    <select type="text" name="color" v-model="color">
                        <option value="red">red</option>
                        <option value="blue">blue</option>
                        <option value="pink">pink</option>
                        <option value="green">green</option>
                        <option value="yellow">yellow</option>
                    </select>
                    <input type="text" name="icon" placeholder="icon" v-model="icon"/>
                    <button class="categories-form__btn" type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                name: null,
                slug: null,
                color: null,
                icon: null,
            }
        },
        methods: {
            async add() {
                await this.$axios.post('/api/categories/add', {
                    name: this.name,
                    slug: this.slug,
                    color: this.color,
                    icon: this.icon,
                })
                this.name = null
                this.slug = null
                this.color = null
                this.icon = null
            }
        }
    }
</script>

<style lang="scss">
    .categories-form {
        display: flex;
        flex-direction: column;
        justify-content: center;

        input, select {
            margin-bottom: 1rem;
        }

        &__btn {
            display: inline-block;
            width: auto;
            background: white;
            border-radius: 1rem;
        }
    }
</style>
