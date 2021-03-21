<template>
    <div class="layout-topbar">
        <button 
            class="p-link layout-menu-button" 
            @click="onMenuToggle"
        >
            <i class="fas fa-bars">MENU</i>
        </button>
    </div>
</template>

<script>

export default {
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        }
    }
}
</script>