import { createApp, reactive } from 'vue';
import App from './App.vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Rating from 'primevue/rating';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import Chip from 'primevue/chip';

import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/layout/layout.scss';
import router from '@/router';
import store from '@/store';
import interceptor from '@/services/interceptor';

store.dispatch("tenant/fetch");
store.dispatch('auth/fetchFromStorage').then(() => {
    const app = createApp(App);
    
    interceptor()
    
    app.use(store);
    app.use(router);
    
    app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
    app.config.globalProperties.$primevue = reactive({ ripple: true });
    
    app.directive('tooltip', Tooltip);
    app.directive('ripple', Ripple);
    
    app.component('Menu', Menu);
    app.component('InputText', InputText);
    app.component('Button', Button);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('Dialog', Dialog);
    app.component('Textarea', Textarea);
    app.component('Rating', Rating);
    app.component('Toolbar', Toolbar);
    app.component('FileUpload', FileUpload);
    app.component('RadioButton', RadioButton);
    app.component('InputNumber', InputNumber);
    app.component('Chip', Chip);
    
    app.mount('#app');
});