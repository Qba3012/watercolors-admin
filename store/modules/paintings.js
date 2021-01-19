import Painting from '~/models/Painting';

const state = () => ({
    paintings: []
});

const mutations = {
    setPaintings(state, paintings) {
        state.paintings = paintings;
    }
};

const actions = {
    async getAll({ commit }) {
        const { data } = await this.$repositories.painting.all();

        if(data) {
            const paintings = data.map(painting => new Painting(painting));
            commit('setPaintings', paintings);
            commit('tags/setTags', paintings, {root:true});
        } 
    },

    async delete({}, id) {
        await this.$repositories.painting.delete(id);
    },

    async create({ dispatch }, {painting, formData}) {
        await this.$repositories.painting.create(painting)
            .then(({data}) => {
                dispatch('images/create', {id: data.id, formData}, {root:true});
            })
            .then(() => {
                dispatch('getAll')
            });
    },

    async update({}, payload) {
        await this.$repositories.painting.update(payload)
            .then(response => {
                this.$notifier.showMessage({message: 'Zaktualizowano dane', success: true});
            });
    }
};

const getters = {
    paintings(state) {
        return state.paintings;
    }
};
    
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}