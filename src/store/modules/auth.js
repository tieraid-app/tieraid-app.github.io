import auth from '@/services/resources/auth';
import jwt_decode from 'jwt-decode';

export default {
    namespaced: true,
    state: {
        access: null,
        refresh: null,
        isAuthenticated: false,
        refreshTokenInterval: null
    },
    mutations: {
        SET_AUTH: (state, { access, refresh }) => {
            state.access = access;
            state.refresh = refresh;
            state.isAuthenticated = true;

            window.sessionStorage.setItem(
                'tokens',
                JSON.stringify({
                    ...state,
                    isAuthenticated: false,
                    refreshTokenInterval: null
                })
            );
        },
        CLEAR_AUTH: state => {
            clearInterval(state.refreshTokenInterval);
            state.refreshTokenInterval = null;
            window.sessionStorage.removeItem('tokens');
        },
        SET_REFRESH_TOKEN_INTERVAL: (state, { func }) => {
            if (!state.refreshTokenInterval) {
                state.refreshTokenInterval = setInterval(func, 1000 * 60 * 4);
            }
        }
    },
    actions: {
        login: ({ commit, dispatch }, { email, password }) => {
            return auth
                .login({ email, password })
                .then(data => {
                    commit('SET_AUTH', data);

                    dispatch('startScheduleRefreshToken');
                })
                .catch(err => {
                    commit('CLEAR_AUTH');
                    console.error(err);
                });
        },
        logout: ({ commit }) => {
            commit('CLEAR_AUTH');
        },
        startScheduleRefreshToken: ({ commit, getters }) => {
            commit('SET_REFRESH_TOKEN_INTERVAL', {
                func: () => {
                    const refresh = getters['getRefreshToken'];

                    if (refresh) {
                        auth.refresh({ refresh })
                            .then(tokens => {
                                commit('SET_AUTH', { refresh, ...tokens });
                            })
                            .catch(err => {
                                // Failed to refresh token
                                commit('CLEAR_AUTH');
                            });
                    } else {
                        commit('CLEAR_AUTH');
                    }
                }
            });
        },
        fetchFromStorage({ commit, dispatch }) {
            try {
                const tokens = JSON.parse(
                    window.sessionStorage.getItem('tokens')
                );

                if (tokens) {
                    /**
                     * In this state we should refresh our token so that we new it is fresh
                     */
                    return new Promise((resolve) => {
                        const { refresh } = tokens;

                        auth.refresh({ refresh })
                            .then(data => {
                                commit('SET_AUTH', { ...data, refresh });

                                dispatch('startScheduleRefreshToken');

                                resolve();
                            })
                            .catch(err => {
                                // Failed to refresh token
                                commit('CLEAR_AUTH');

                                resolve();
                            });
                    });
                }
            } catch {
                commit('CLEAR_AUTH');
            }
        }
    },
    getters: {
        isAuthenticated: state => {
            return state.isAuthenticated;
        },
        getAccessToken: state => {
            return state.access;
        },
        getRefreshToken: state => {
            return state.refresh;
        }
    }
};
