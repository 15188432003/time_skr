const getState = () => {
    return {
        shopList: [],
        shoplength: 0
    }
}
const state = getState()

const mutations = {
    SETSHOPLIST(state, val) {
        state.shopList = val
    },
    SETSHOPLENGTH(state, length) {
        state.shoplength = length
    }
}

const actions = {
    setShopList(store, val) {
        let length = 0
        if (val) {
            length = val.length
        } 
        store.commit('SETSHOPLIST', val)
        store.commit('SETSHOPLENGTH', length)

    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}