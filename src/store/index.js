import { createStore } from 'vuex'
import auth from '@/store/modules/auth';
import tenant from '@/store/modules/tenant';
import products from '@/store/modules/products';

export default createStore({
    modules: {
        auth,
        tenant,
        products
    }
})
