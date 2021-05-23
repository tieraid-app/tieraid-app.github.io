import customers from '@/services/resources/customers';

export default {
    namespaced: true,
    state: {
        customers: []
    },
    getters: {
        get: state => {
            return state.customers;
        }
    },
    mutations: {
        SET_CUSTOMERS: (state, customers) => {
            state.customers = [...customers];
        },
        ADD_PRODUCT: (state, product) => {
            state.customers = [...state.customers, product];
        }
    },
    actions: {
        fetchAll: ({ commit }) => {
            customers.fetch().then((data) => {
                commit('SET_CUSTOMERS', data);       
            }).catch(() => {
                console.error('ERROR FETCHING CUSTOMERS');
            });
        },
    }
}