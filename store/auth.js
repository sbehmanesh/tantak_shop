export const state = () => ({
    user: null,
    token: null,
    app_id: null,
    city_id: '',
    login_dialog:false
})

export const mutations = {
    set_user: function (state, data) {
        state.user = data
    },
    set_login_dialog: function (state, data) {
        state.login_dialog = data
    },
    set_token: function (state, data) {
        state.token = data
        this.$cookies.set('token', data, { path: '/', maxAge: 60 * 60 * 24 * 10 ,sameSite:"lax"})
    },
    set_city_id: function (state, data) {
        state.city_id = data
        this.$cookies.set('city_id', data, { path: '/', maxAge: 60 * 60 * 24 * 100 ,sameSite:"lax" })
    },
    set_app_id: function (state, data) {
        state.app_id = data
        this.$cookies.set('app_id', data, { path: '/' , sameSite:"lax"})
    },
}

export const actions = {
    // async nuxtServerInit({ commit, dispatch }, { req, $parseCookie }) {
    //     try {
    //         let cookies = $parseCookie(req.headers.cookie)

    //         if (typeof cookies.app_id == 'string') {
    //             await commit('set_app_id', cookies.app_id)
    //         }else{
    //             await dispatch('generateAppId')
    //         }
    //         if (typeof cookies.city_id == 'string') {
    //             await commit('set_city_id', cookies.city_id)
    //         }
    //         if (typeof cookies.token == 'string') {
    //             await commit('set_token', cookies.token)
    //             await dispatch('getUser')
    //             return
    //         }
    //     } catch (error) {
    //     }
    //     await dispatch('clearAuth')
    // },
    getUser({ dispatch }) {
        return new Promise((res, rej) => {
            this.$reqApi(`/auth/user`, { getToken: true })
                .then(async (response) => {
                    await dispatch('setAuth', {
                        user: response.user,
                        token: response.Authorization,
                    })
                    res(response)
                })
                .catch(async (error) => {
                    await dispatch('clearAuth')
                    rej()
                })
        })
    },
    async setCity({ state, commit }, { id, force = false }) {
        if (force) {
            commit('set_city_id', id)
        } else if (!Boolean(state.city_id)) {
            commit('set_city_id', id)
        }
    },
    async login({ dispatch }, { user, Authorization }) {
        await dispatch('setAuth', {
            user,
            token: Authorization,
        })
        await dispatch('base/getBasket','',{ root: true })
    },
    async logout({ dispatch }) {
        this.$reqApi('/auth/logout')
        .then(res => {
            this.$cookies.removeAll()
            window.location.href = '/'
        })
        .catch(error => { })
    },
    async error401({ dispatch }) {
        await dispatch('clearAuth')
        window.location.href = '/'
    },
    async setAuth({ commit }, { user, token = null }) {
        await commit('set_user', user)
        if (Boolean(token)) {
            await commit('set_token', token)
        }
    },
    async clearAuth({ commit }) {
        try {
            await commit('set_user', null)
            await commit('set_token', null)
        } catch (error) { }
    },
    updateProfile({ state, commit }, form) {
        let user = { ...state.user }
        for (const key in form) {
            user[key] = form[key]
        }
        commit('set_user', user)
    },
    generateAppId({commit}){
        var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };

        var token = function() {
            return rand() + rand() + rand() + rand()+ rand() + rand(); // to make it longer
        };
       commit('set_app_id', token())
    },
    loginDialog({commit},status){
        commit('set_login_dialog', status)
    }
}