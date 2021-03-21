import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/layout/layout.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp, reactive } from 'vue';

import App from './App.vue';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import interceptor from '@/services/interceptor';
import router from '@/router';
import store from '@/store';

interceptor();

store.dispatch('auth/fetchFromStorage').then(() => {
    store.dispatch('tenant/fetch');

    if (store.getters['auth/isAuthenticated']) {
        store.dispatch('users/fetchCurrentUser');
    }

    const app = createApp(App);

    app.use(store);
    app.use(router);

    app.config.globalProperties.$appState = reactive({
        inputStyle: 'outlined'
    });
    app.config.globalProperties.$primevue = reactive({ ripple: true });

    app.directive('tooltip', Tooltip);
    app.directive('ripple', Ripple);
    app.mount('#app');
});
