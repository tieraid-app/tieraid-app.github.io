<template>
    <div
        :class="containerClass"
        @click="onWrapperClick"
    >
        <AppMenuBar />
        <transition
            v-if="isAuthenticated"
            name="layout-sidebar layout-sidebar-dark"
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
    </div>
</template>


<script>
import AppProfile from '@/components/AppProfile.vue';
import AppMenu from '@/components/AppMenu.vue';
import AppMenuBar from '@/components/AppMenuBar.vue';

export default {
    components: {
        AppMenu,
        AppProfile,
        AppMenuBar,
    },
    data() {
        return {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-home',
                    to: '/',
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Overview',
                            icon: 'pi pi-fw pi-id-card',
                            to: '/manage/',
                        },
                        {
                            label: 'Products',
                            icon: 'pi pi-fw pi-id-card',
                            to: '/manage/products/',
                        },
                    ],
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.p-menubar {
  height: 3em;
  color: black;
}
</style>