export const state = () => ({
    landing_page: {
        data: null,
        refresh: 0
    },
    product_list: {
        filter: {},
        refresh: 0
    },
    basket: {
        data: null,
        refresh: 0
    },
    discount: {
        data: null,
        refresh: 0
    },
    delivery_method: [],
    main_slider: [],
    mixture_type: [],
    mixture_setting: null,
    main_setting: [],
    table_info: {
        page: 1,
        path: '',
    },

})

export const mutations = {
    set_landing_page: function (state, data) {
        state.landing_page.data = data
        state.landing_page.refresh++
    },
    set_product_list_filter: function (state, data) {
        state.product_list.filter = data
        state.product_list.refresh++

    },
    set_discount: function (state, discount) {
        state.discount.data = discount
        state.discount.refresh++
    },
    set_basket: function (state, data) {
        state.basket.data = data
        state.basket.refresh++
    },
    set_basket_without_api: function (state, new_basket) {
        state.basket.data = new_basket
        state.basket.refresh++
    },
    set_delivery_method: function (state, data) {
        data.settings.forEach((item) => {
            if (item.key == "delivery_method") {
                let object = JSON.parse(item.value)
                object["id"] = item.id
                state.delivery_method.push(object)
            }
        })
    },
    set_main_slider: function (state, data) {
        data.settings.forEach((item) => {
            if (item.key == "main_slider") {
                state.main_slider.push(JSON.parse(item.value))
            }
        })
    },
    set_mixture_type: function (state, data) {
        data.settings.forEach((item) => {
            if (item.key == "mixture_type") {
                state.mixture_type.push(item)
            }
        })
    },
    set_mixture_setting: function (state, data) {
        data.settings.forEach((item) => {
            if (item.key == "mixture_setting") {
                state.mixture_setting = JSON.parse(item.value)
            }
        })
    },
    set_main_setting: function (state, data) {
        data.settings.forEach((item) => {
            if (item.key == "main_setting") {
                state.main_setting = JSON.parse(item.value)
            }
        })
    },
    set_table_key: (state, data) => {
        state.table_info = data
    },
}

export const actions = {
    getLandingPage({ dispatch }) {
        return new Promise((res, rej) => {
            this.$reqApi(`/landing-page`)
                .then(async (response) => {
                    await dispatch('setLandingPage', response)
                    await dispatch('getBasket')
                    res(response)
                })
                .catch(async (error) => {
                    rej()
                })
        })
    },
    getBasket({ dispatch }) {
        // return new Promise((res, rej) => {
        //     this.$reqApi(`/basket/my`)
        //         .then(async (response) => {
        //             await dispatch('setBasket', response)
        //             res(response)
        //         })
        //         .catch(async (error) => {
        //             rej()
        //         })
        // })
    },
    updateBasket({ dispatch }, form) {
        return new Promise((res, rej) => {
            this.$reqApi(`/basket/update`, form)
                .then(async (response) => {
                    await dispatch('getBasket')
                    res(response)
                })
                .catch(async (error) => {
                    rej()
                })
        })
    },
    async setLandingPage({ commit }, data) {
        commit('set_landing_page', data)
        commit('set_delivery_method', data)
        commit('set_main_slider', data)
        commit('set_mixture_type', data)
        commit('set_mixture_setting', data)
        commit('set_main_setting', data)
    },
    async setBasket({ commit }, data) {
        commit('set_basket', data)
    },
    async setTableInfo({ commit, state }, data) {
        await commit('set_table_key', data)
    },
    setProductListFilter({ commit }, filter) {
        commit('set_product_list_filter', filter)
    },
    updateBasketWithoutApi({ commit }, new_basket) {
        commit('set_basket_without_api', new_basket);
    },
    setDiscount({ commit }, discount) {
        commit('set_discount', discount)
    },
}