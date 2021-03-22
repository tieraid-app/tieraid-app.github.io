import users from '@/services/resources/users';

export default {
    namespaced: true,
    state: {
        me: {
            first_name: '',
            last_name: ''
        }
    },
    getters: {
        current: state => {
            return state.me;
        }
    },
    mutations: {
        SET_CURRENT_USER: (state, user) => {
            state.me = user;
        }
    },
    actions: {
        fetchMe: async ({ commit }) => {
            return users.me().then(user => {
                commit('SET_CURRENT_USER', user);
            });
        },
        update: ({ commit }, payload) => {
            users.update(payload.id, { ...payload }).then((user) => {
                commit('SET_CURRENT_USER', user);
            })
        }
    }
};
