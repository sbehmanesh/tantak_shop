export const state = () => ({
    basket: [],
})

export const mutations = {
    set_basket: function (state, data) {
        state.basket = data
        if (Boolean(data)) {
            localStorage.setItem('basket', JSON.stringify(data))
        }
    },
}

export const actions = {
    async nuxtServerInit({ commit }) {
        try {
            let basket = localStorage.getItem('basket')
            if (Boolean(basket)) {
                basket = JSON.parse(basket)
                if (Array.isArray(basket)) {
                    await commit('set_basket', basket)
                }
            }
        } catch (error) {
        }
    },
    async addBasketItem({ state, commit }, item) {
        let basket = state.basket.map(x => ({ ...x }))
        let find_index = basket.findIndex(x => x.id == item.id)
        if (find_index != -1) {
            basket[find_index].count++
        } else {
            basket.push({
                ...item,
                count: 1
            })
        }
        await commit('set_basket', basket)
    },
    async removeBasketItem({ state, commit }, id) {
        let basket = state.basket.map(x => ({ ...x }))
        let check = basket.find(x => x.id == id)

        if (check && check.count > 1) {
            check.count--
        } else {
            basket = basket.filter(x => x.id != id)
        }
        await commit('set_basket', basket)
    },
    async removeBasketItemComplete({ state, commit }, id) {
        let basket = state.basket.filter(x => x.id != id)
        await commit('set_basket', basket)
    },
}