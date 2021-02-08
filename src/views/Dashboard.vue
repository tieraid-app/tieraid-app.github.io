<template>
    <transition name="layout-sidebar">
        <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
            <div class="layout-logo">
                <router-link to="/">
                    <img alt="Logo" :src="logo" />
                </router-link>
            </div>

            <AppProfile />
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

    </transition>

</template>

<script>
export default {

}
</script>

<style>

</style>