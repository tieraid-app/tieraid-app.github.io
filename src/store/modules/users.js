import user from '@/services/resources/user';

export default {
    namespaced: true,
    state: {
        currentUser: {}
    },
    getters: {
        current: state => {
            return state.currentUser;
        }
    },
    mutations: {
        SET_CURRENT_USER: (state, user) => {
            state.currentUser = user;
        }
    },
    actions: {
        fetchCurrentUser: async ({ commit }) => {
            return user.me().then(user => {
                commit('SET_CURRENT_USER', user);
            });
        }
    }
};
