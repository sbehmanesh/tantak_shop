let app_name = 'فروشگاه گل قند'

export const state = () => ({
  server_time: '',
  top_loader: false,
  page_title: app_name,
  // file_url: 'https://api.goolghand.com/',
  // server_url: 'https://api.goolghand.com/api/v1',
  // file_url: 'https://api.rakebi.com/',
  // server_url: 'https://api.rakebi.com/api/v1',
})

export const mutations = {
  set_title: function (state, data) {
    if (typeof data != 'string' && data.length == 0) {
      data = app_name
    }
    state.page_title = data + ' | ' + app_name
  },
  set_top_loader: function (state, data) {
    state.top_loader = data
  },
  set_server_time: function (state, data) {
    state.server_time = data
    let offset = new Date(data).getTime() - Date.now()
    this.$moment.now = () => {
      return offset + Date.now()
    }
  },
}

export const actions = {
  // async nuxtServerInit({ dispatch }, context) {
    // await dispatch('auth/nuxtServerInit', context)
    // await dispatch('base/getLandingPage', context)
  // },
  setPageTitle({ commit }, title) {
    commit('set_title', title)
  },
  setServerTime({ commit }, date) {
    commit('set_server_time', date)
  },
  setTopLoader({ commit }, date) {
    commit('set_top_loader', date)
  },
}
