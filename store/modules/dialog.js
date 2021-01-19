const state = () => ({
    message: '',
    action: {
        title: '',
        callback: ''
    }
});

const mutations = {
    showMessage(state, payload) {
        state.message = payload.message;
        state.action.title = payload.action.title;
        state.action.callback = payload.action.callback;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}