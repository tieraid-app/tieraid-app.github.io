<template>
    <div v-if="isLoggedIn">
        <AppMainMenu />
    </div>
    <router-view />
</template>


<script>
    import AppMainMenu from '@/components/AppMainMenu.vue';
    import TokenService from './service/TokenService';

    export default {
        components: {
            AppMainMenu
        },
        computed: {
            isLoggedIn() {
                const isAuthenticated = TokenService.isAuthenticated();
                if (isAuthenticated) {
                    TokenService.startRefresh();
                }
                return isAuthenticated;
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