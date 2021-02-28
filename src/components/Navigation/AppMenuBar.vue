<template>
    <Menubar :model="menuBarItems">
        <template #start>
            <div class="layout-logo">
                {{ company }}
            </div>
        </template>
        <template #end>
            <Avatar
                shape="circle"
                size="medium"
            >
                <img
                    src="@/assets/images/logo_dogo.png"
                    alt=""
                >
            </Avatar>
        </template>
    </Menubar>
</template>

<script>
import Avatar from 'primevue/avatar/Avatar';
import Menubar from 'primevue/menubar/Menubar';

export default {
    components: {
        Avatar,
        Menubar
    },
    computed: {
        company() {
            return this.$store.getters['tenant/get'].name;
        },
    },
    props: {
        menuBarItems: {
            type: Object,
            default: null
        },
    }
};
</script>
