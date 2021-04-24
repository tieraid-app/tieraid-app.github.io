<template>
    <div 
        :class="containerClass" 
        @click="onWrapperClick"
    >
        <AppTopBar
            v-if="isAuthenticated"
            @menu-toggle="onMenuToggle"
        />
        <transition 
            name="layout-sidebar"
            v-if="isAuthenticated"
        >
            <div
                v-show="isSidebarVisible"
                :class="sidebarClass"
                @click="onSidebarClick"
            >
                <AppProfile />
                <AppMenu
                    :model="menu"
                    @menuitem-click="onMenuItemClick"
                />
            </div>
        </transition>
        
        <div :class="isAuthenticated ? 'layout-main' : ''">
            <router-view />
        </div>
        <div class="layout-footer">
            Powered by Tieraid
        </div>
    </div>
</template>


<script>
import AppProfile from '@/components/Navigation/AppProfile.vue';
import AppMenu from '@/components/Navigation/AppMenu.vue';
import AppTopBar from '@/components/Navigation/AppTopBar.vue';

export default {
    components: {
        AppMenu,
        AppProfile,
        AppTopBar
    },
    data() {
        return {
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: true,
            mobileMenuActive: true,
            menu: [
                {
                    label: 'Dashboard',
                    icon: 'fas fa-th-large',
                    to: '/',
                },
                
                {
                    label: 'Marketplace',
                    icon: 'fas fa-store',
                    to: '/marketplace/',
                },
                {
                    label: 'Sell',
                    icon: 'fas fa-tasks',
                    items: [
                        {
                            label: 'Orders',
                            icon: 'fas fa-shopping-basket',
                            to: '/manage/orders',
                        },
                        {
                            label: 'Catalog',
                            icon: 'fas fa-store-alt',
                            to: '/manage/products/',
                        },
                        {
                            label: 'Customers',
                            icon: 'far fa-handshake',
                            to: '/manage/customers',
                        },
                        {
                            label: 'Stats',
                            icon: 'far fa-chart-bar',
                            to: '/manage/stats',
                        },
                    ],
                },
                {
                    label: 'Feedback',
                    icon: 'far fa-comment-dots',
                    to: '/feedback/',
                },
                {
                    label: 'Settings',
                    icon: 'fas fa-cog',
                    to: '/settings/',
                },
            ],
        };
    },
    computed: {
        containerClass() {
            return [
                'layout-wrapper',
                {
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-static-sidebar-inactive':
            this.staticMenuInactive && this.layoutMode === 'static',
                    'layout-overlay-sidebar-active':
            this.overlayMenuActive && this.layoutMode === 'overlay',
                    'layout-mobile-sidebar-active': this.mobileMenuActive,
                    'p-input-filled': this.$appState.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.ripple === false,
                },
            ];
        },
        sidebarClass() {
            return [
                'layout-sidebar',
                {
                    'layout-sidebar-dark': this.layoutColorMode === 'dark',
                    'layout-sidebar-light': this.layoutColorMode === 'light',
                },
            ];
        },
        isDesktop() {
            return window.innerWidth > 1024;
        },
        isSidebarVisible() {
            if (this.isDesktop) {
                if (this.layoutMode === 'static') return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay') return this.overlayMenuActive;
                else return true;
            } else {
                return true;
            }
        },
        isAuthenticated() {
            return (
                this.$store.getters['auth/isAuthenticated'] &&
                this.$route.name !== 'Login'
            );
        },
        company() {
            return this.$store.getters['tenant/get'].name;
        },
    },
    watch: {
        $route() {
            this.menuActive = false;
        },
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;
            console.log(this.isDesktop);
            if (this.isDesktop) {
                if (this.layoutMode === 'overlay') {
                    if (this.mobileMenuActive === true) {
                        this.overlayMenuActive = true;
                    }
                    this.overlayMenuActive = !this.overlayMenuActive;
                    this.mobileMenuActive = false;
                } else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            } else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }
            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
        onLayoutChange(layoutMode) {
            this.layoutMode = layoutMode;
        },
        onLayoutColorChange(layoutColorMode) {
            this.layoutColorMode = layoutColorMode;
        },
        addClass(element, className) {
            if (element.classList) element.classList.add(className);
            else element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList) element.classList.remove(className);
            else
                element.className = element.className.replace(
                    new RegExp(
                        '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
                        'gi'
                    ),
                    ' '
                );
        },
    },
};
</script>
<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>