import { createApp, reactive } from 'vue';
import App from './App.vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/layout/sass/_layout.scss'
import router from './router'
import store from './store'

const app = createApp(App);

app.use(store);
app.use(router);

app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
app.config.globalProperties.$primevue = reactive({ ripple: true });

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);

app.component('Menu', Menu);
app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app');