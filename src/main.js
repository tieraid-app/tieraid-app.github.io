import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/layout/layout.scss';

import { createApp, reactive } from 'vue';

import App from './App.vue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Chip from 'primevue/chip';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Ripple from 'primevue/ripple';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import Tooltip from 'primevue/tooltip';
import interceptor from '@/services/interceptor';
import router from '@/router';
import store from '@/store';

store.dispatch('tenant/fetch');
store.dispatch('auth/fetchFromStorage').then(() => {
  const app = createApp(App);

  interceptor();

  app.use(store);
  app.use(router);

  app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
  app.config.globalProperties.$primevue = reactive({ ripple: true });

  app.directive('tooltip', Tooltip);
  app.directive('ripple', Ripple);

  app.component('Avatar', Avatar);
  app.component('Menu', Menu);
  app.component('Menubar', Menubar)
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
  app.component('Message', Message);

  app.mount('#app');
});
