import Subscriber from '~/models/Subscriber';

const state = () => ({
    subscribers: []
});

const mutations = {
    setSubscribers(state, subscribers) {
        state.subscribers = subscribers;
    },
};

const actions = {
    async getAll({ commit }) {
        const { data } = await this.$repositories.newsletter.all();

        if(data) {
            const subscribers = data.map(sub => new Subscriber(sub));
            commit('setSubscribers', subscribers);
        } 
    },

    async delete({}, id) {
        await this.$repositories.newsletter.delete(id);
    },

    async send({}, request) {
        await this.$repositories.newsletter.send(request);
    }
};

const getters = {
    subscribers(state) {
        return state.subscribers;
    }
};
    
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}