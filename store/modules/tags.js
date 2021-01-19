const state = () => ({
    tags: []
});

const mutations = {
    setTags(state, paintings) {
        paintings.forEach(image => {
            image.tags.forEach(tag => {
                if(!state.tags.includes(tag)) {
                    state.tags.push(tag);
                }
            });
        });
    }
};

const getters = {
    tags(state) {
        return state.tags;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};