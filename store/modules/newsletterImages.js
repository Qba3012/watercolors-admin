import NewsletterImage from '~/models/NewsletterImage';

const state = () => ({
    images: []
});

const mutations = {
    setImages(state, images) {
        state.images = images;
    },
};

const actions = {

    async getAll({ commit }) {
        const { data } = await this.$repositories.newsletterImage.all();

        if(data) {
            const images = data.map(img => new NewsletterImage(img));
            commit('setImages', images);
        } 
    },

    async delete({}, imageName) {
        await this.$repositories.newsletterImage.delete(imageName);
    },

    async create({}, formData) {
        await this.$repositories.newsletterImage.create(formData);
    }

};

const getters = {
    images(state) {
        return state.images;
    }
};
    
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}