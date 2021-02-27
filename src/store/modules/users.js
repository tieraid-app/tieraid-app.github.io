import user from '@/services/resources/user';

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
            return user.me().then(user => {
                commit('SET_CURRENT_USER', user);
            });
        }
    }
};
