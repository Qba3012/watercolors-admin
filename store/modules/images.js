const actions = {

    async delete({}, {id, fileName}) {
        await this.$repositories.image.delete(id, fileName)
            .then(this.$notifier.showMessage({message: 'Zdjęcie usunięto', success: true}));
    },

    async create({}, {id, formData}) {
        await this.$repositories.image.create(formData, id);
    },

};
    
export default {
    namespaced: true,
    actions
}