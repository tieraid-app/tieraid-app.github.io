import { createApp } from 'vue';
import App from './App.vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.component('Menu', Menu);
app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app');