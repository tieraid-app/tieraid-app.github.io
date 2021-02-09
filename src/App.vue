<template>
    <div v-if="isLoggedIn">
        <AppMainMenu />
    </div>
    <router-view />
</template>


<script>
    import AppMainMenu from '@/components/AppMainMenu.vue';

    export default {
        components: {
            AppMainMenu
        },
        computed: {
            isLoggedIn() {
                return (window.localStorage.getItem('logged-in') && window.localStorage.getItem('logged-in') === 'true');
            }
        }
    }
</script>
<style lang="scss">
    body {
        margin: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

</style>