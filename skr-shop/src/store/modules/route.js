const getShowState = () => {
    return {
        name: '',
        shopList: []
    }
}
const state = getShowState()

const mutations = {
    PARRAMSNAME(state, val) {
        state.name = val
    },
    PARAMSSHOP(state, val) {
        state.shopList = val
    }
}

const actions = {
    paramsName(store, val) {
        store.commit('PARRAMSNAME', val)
    },
    paramsShop(store, val) {
        store.commit('PARAMSSHOP', val)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}