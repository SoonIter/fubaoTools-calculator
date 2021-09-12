import {
    createStore
} from 'vuex'

export default createStore({
    namespaced: true,
    state: {
        a: "helloVuex"
    },
    mutations: {},
    actions: {},
})