const state = () => ({
    message: '',
    success: false
});

const mutations = {
    showMessage(state, payload) {
        state.message = payload.message;
        state.success = payload.success;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}