<template>
    <div class="layout-topbar">
        <button
            class="p-link layout-menu-button"
            @click="onMenuToggle"
        >
            <span class="pi pi-bars" />
        </button>
        <div class="layout-topbar-icons">
            <span class="layout-topbar-search">
                <InputText
                    type="text"
                    placeholder="Search"
                />
                <span class="layout-topbar-search-icon pi pi-search" />
            </span>
            <button class="p-link">
                <span class="layout-topbar-item-text">Events</span>
                <span class="layout-topbar-icon pi pi-calendar" />
                <span class="layout-topbar-badge">5</span>
            </button>
            <button class="p-link">
                <span class="layout-topbar-item-text">Settings</span>
                <span class="layout-topbar-icon pi pi-cog" />
            </button>
            <button class="p-link">
                <span class="layout-topbar-item-text">User</span>
                <span class="layout-topbar-icon pi pi-user" />
            </button>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
    components: {
        InputText
    },
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        }
    }
}
</script>