import { createStore } from 'vuex'
import auth from '@/store/modules/auth';
import tenant from '@/store/modules/tenant';

export default createStore({
    modules: {
        auth,
        tenant
    }
})
