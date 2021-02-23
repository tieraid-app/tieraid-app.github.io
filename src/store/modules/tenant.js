import tenant from '@/services/resources/tenant';

export default {
  namespaced: true,
  state: {
    company: {
      name: '',
      description: '',
    },
  },
  getters: {
    get: (state) => {
      return state.company;
    },
  },
  mutations: {
    SET_INFO: (state, { name, description }) => {
      state.company.name = name;
      state.company.description = description;
    },
  },
  actions: {
    fetch: async ({ commit }) => {
      return tenant.fetch().then(({ name, description }) => {
        commit('SET_INFO', { name, description });
      });
    },
  },
};
