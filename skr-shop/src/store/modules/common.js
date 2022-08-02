const getShowState = () => {
    return {
        isShow: '',
        checkList: null,
        searchShow: '' 
    }
}
const state = getShowState()

const mutations = {
    CHANGESHOW(state, val) {
        state.isShow = val
    },
    CHECK_LIST(state, val) {
        state.checkList = val
    },
    SEARCHSHOW(state, val) {
        state.searchShow = val
    }
}

const actions = {
    commitShow(store, val) {
        store.commit('CHANGESHOW', val)
    },
    checkList({
        commit
    }, val) {
        commit('CHECK_LIST', val)
    },
    searchShow(store, val) {
        store.commit('SEARCHSHOW', val)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}