import products from '@/services/resources/products';

export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {
        get: state => {
            return state.products;
        }
    },
    mutations: {
        SET_PRODUCTS: (state, products) => {
            state.products = [...products];
        },
        ADD_PRODUCT: (state, product) => {
            state.products = [...state.products, product];
        }
    },
    actions: {
        fetchAll: ({ commit }) => {
            products.fetchAll().then((data) => {
                commit('SET_PRODUCTS', data);       
            }).catch(() => {
                console.error('ERROR FETCHING PRODUCTS');
            });
        },
        create: ({ dispatch }, payload) => {
            products.create(payload).then(() => {
                dispatch('fetchAll');
            })
        },
        fetch: () => {

        },
        update: ({ dispatch }, payload) => {
            products.update(payload.id, { ...payload }).then(() => {
                dispatch('fetchAll');
            })
        },
        delete: ({ dispatch }, { id }) => {
            products.delete(id).then(() => {
                dispatch('fetchAll');
            })
        }
    }
};