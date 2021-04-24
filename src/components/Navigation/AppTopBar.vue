<template>
    <div class="layout-topbar">
        <button 
            class="p-link layout-menu-button" 
            @click="onMenuToggle"
        >
            <i class="fas fa-bars" />
        </button>
        <div class="layout-topbar-icons">
            <button class="p-link">
                <span class="layout-topbar-item-text">Cart</span>
                <span class="layout-topbar-icon pi pi-shopping-cart"></span>
                <span class="layout-topbar-badge">1</span>
            </button>
        </div>
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
