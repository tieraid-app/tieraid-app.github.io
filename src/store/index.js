import auth from '@/store/modules/auth';
import { createStore } from 'vuex'
import products from '@/store/modules/products';
import tenant from '@/store/modules/tenant';
import users from '@/store/modules/users';
import customers from '@/store/modules/customers';

export default createStore({
    modules: {
        auth,
        users,
        tenant,
        products,
        customers
    }
})
