import auth from '@/services/resources/auth';

export default {
  namespaced: true,
  state: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    refreshTokenInterval: null,
  },
  mutations: {
    SET_AUTH: (state, { accessToken, refreshToken, isAuthenticated }) => {
      (state.accessToken = accessToken || state.accessToken),
        (state.refreshToken = refreshToken || state.refreshToken),
        (state.isAuthenticated = isAuthenticated || state.isAuthenticated);

      window.sessionStorage.setItem(
        'tokens',
        JSON.stringify({ ...state, refreshTokenInterval: null })
      );
    },
    CLEAR_AUTH: (state) => {
      clearInterval(state.refreshTokenInterval);
      state.refreshTokenInterval = null;
      window.sessionStorage.removeItem('tokens');
    },
    SET_REFRESH_TOKEN_INTERVAL: (state, { func }) => {
      if (!state.refreshTokenInterval) {
        state.refreshTokenInterval = setInterval(func, 1000 * 60 * 4);
      }
    },
  },
  actions: {
    login: ({ commit, dispatch }, { email, password }) => {
      return auth
        .login({ email, password })
        .then(({ access, refresh }) => {
          commit('SET_AUTH', {
            accessToken: access,
            refreshToken: refresh,
            isAuthenticated: true,
          });

          dispatch('startScheduleRefreshToken');
          return;
        })
        .catch((err) => {
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
          console.log('SET INTERVAL');
          const refresh = getters['getRefreshToken'];
          if (refresh !== null) {
            auth.refresh({ refresh }).then((tokens) => {
              console.log(tokens);
              commit('SET_AUTH', { accessToken: tokens.access });
            });
          } else {
            commit('CLEAR_AUTH');
          }
        },
      });
    },
    fetchFromStorage({ commit, dispatch }) {
      try {
        const tokens = JSON.parse(window.sessionStorage.getItem('tokens'));

        if (tokens) {
          commit('SET_AUTH', { ...tokens });
          dispatch('startScheduleRefreshToken');
        }
        return tokens;
      } catch {
        commit('CLEAR_AUTH');
      }
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getRefreshToken: (state) => {
      return state.refreshToken;
    },
  },
};
