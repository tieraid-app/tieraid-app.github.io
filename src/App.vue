<template>
    <div v-if="!isLogin">
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
            isLogin() {
                return this.$route.name === 'Login';
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