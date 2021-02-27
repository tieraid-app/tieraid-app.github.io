<template>
    <div class="layout-menu-container">
        <AppSubmenu
            :items="model"
            class="layout-menu"
            :root="true"
            @menuitem-click="onMenuItemClick"
        />
    </div>
</template>

<script>
import AppSubmenu from '@/components/Navigation/AppSubmenu';
export default {
    components: {
        'AppSubmenu': AppSubmenu
    },
    props: {
        model: Array,
    },
    emits: ['menuitem-click'],
    methods: {
        onMenuItemClick(event) {
            this.$emit('menuitem-click', event);
        }
    },
}
</script>

