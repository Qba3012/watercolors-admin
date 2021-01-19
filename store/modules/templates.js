import Template from '~/models/Template';

const state = () => ({
    templates: []
});

const mutations = {
    setTemplates(state, templates) {
        state.templates = templates;
    },
};

const actions = {
    
    async getAll({ commit }) {
        const { data } = await this.$repositories.template.all();

        if(data) {
            const templates = data.map(template => new Template(template));
            commit('setTemplates', templates);
        } 
    },

    async create({}, template) {
        await this.$repositories.template.create(template);
    },

    async delete({}, templateName) {
        await this.$repositories.template.delete(templateName);
    },

    async test({},{templateName, templateData}) {
        await this.$repositories.template.test(templateName, templateData);
    },

};

const getters = {
    templates(state) {
        return state.templates;
    }
};
    
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}