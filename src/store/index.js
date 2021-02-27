import auth from '@/store/modules/auth';
import { createStore } from 'vuex'
import currentUser from '@/store/modules/users';
import products from '@/store/modules/products';
import tenant from '@/store/modules/tenant';

export default createStore({
    modules: {
        auth,
        currentUser,
        tenant,
        products
    }
})
