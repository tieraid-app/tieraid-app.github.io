import api from '@/services/api';

const ENDPOINT = '/user/';

export default {
    namespaced: true,
    state: {
        current: {}
    },
    getters: {
        get: state => {
            return state.currentUser;
        }
    },
    mutations: {
        SET_CURRENT_USER: (state, { user }) => {
            state.currentUser = user;
        }
    },
    actions: {
        fetch: async ({ commit }) => {
            return api.get(ENDPOINT).then(user => {
                commit('SET_CURRENT_USER', user);
            });
        }
    }
};
