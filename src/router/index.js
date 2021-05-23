import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import store from '@/store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () => import( /* webpackChunkName: "forgotpassword" */ '../views/ForgotPassword.vue')
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/account',
        name: 'Account',
        component: () => import( /* webpackChunkName: "accounts" */ '../views/Account.vue'),
        meta: {
            requiresAuth: true
        }  
    },
    { 
        path: '/settings',
        name: 'Settings',
        component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
        meta: {
            requiresAuth: true
        }  
    },
    { 
        path: '/marketplace/',
        component: () => import( /* webpackChunkName: "marketplace" */ '../views/Marketplace.vue'),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/manage/products',
        component: () => import( /* webpackChunkName: "products" */ '../views/Products.vue'),
        meta: {
            requiresAuth: true
        }
        
    },
    { 
        path: '/manage/customers',
        component: () => import( /* webpackChunkName: "customers" */ '../views/Customers.vue'),
        meta: {
            requiresAuth: true
        }
        
    },
]


const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(!store.getters['auth/isAuthenticated'] && to.name !== 'Login' && to?.meta?.requiresAuth) {
        router.push({ name: 'Login' })
    }

    if (to.name === 'Login' && store.getters['auth/isAuthenticated']) {
        router.push({ name: 'Dashboard' })
    }
    next();
})

export default router