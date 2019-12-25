<template>
    <div>
        <AppHeader/>
        <main>
            <nuxt/>
        </main>
        <Footer/>
        <!--<AppLoader/>-->
    </div>
</template>

<script>
    import AppHeader from '../components/AppHeader'
    import Footer from '../components/Footer'
    import AppLoader from '../components/loader/AppLoader'

    export default {
        components: {
            AppLoader,
            Footer,
            AppHeader
        }
    }
</script>
