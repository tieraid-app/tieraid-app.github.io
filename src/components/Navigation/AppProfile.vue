<template>
    <div class="layout-profile p-grid p-jc-center">
        <div class="p-col-12">
            <Avatar 
                shape="circle" 
                size="large"
            >
                <img 
                    src="@/assets/images/logo_dogo.png" 
                    alt=""
                >
            </Avatar>
        </div>
        <div class="p-col-12">
            <button 
                class="p-link layout-profile-link" 
                @click="onClick"
            >
                <span class="username">{{ name }}</span>
                <i class="pi pi-fw pi-cog" />
            </button>
            <transition name="layout-submenu-wrapper">
                <ul v-show="expanded">
                    <li>
                        <button class="p-link">
                            <i class="pi pi-fw pi-user" /><span>Account</span>
                        </button>
                    </li>
                    <li>
                        <button class="p-link">
                            <i class="pi pi-fw pi-inbox" />
                            <span>Notifications</span>
                            <span class="menuitem-badge">2</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            class="p-link" 
                            @click="logout"
                        >
                            <i class="pi pi-fw pi-power-off" /><span>Logout</span>
                        </button>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
import Avatar from 'primevue/avatar/Avatar';

export default {
    components: {
        Avatar
    },
    data() {
        return {
            expanded: false
        };
    },
    computed: {
        name() {
            const user = this.$store.getters['users/current'];

            return `${user.first_name} ${user.last_name}`;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.go();
        },
        onClick(event) {
            this.expanded = !this.expanded;
            event.preventDefault();
        }
    }
};
</script>

<style scoped></style>
