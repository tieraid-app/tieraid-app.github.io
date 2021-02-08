<template>
  <Login/>
</template>

<script>
  import Login from './pages/Login.vue';

  export default {
    name: 'App',
    components: {
      Login,
    }
  }
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 14px;
    color: #333333;
    background-color: #edf0f5;
    margin: 0;
    padding: 0;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
