const resource = '/mail/templates';

export default ($axios) => ({
    
    all() {
        return $axios.get(`${resource}`);
    },

    create(template) {
        return $axios.post(`${resource}`, template);
    },

    test(templateName, templateData) {
        return $axios.post(`${resource}/test?name=${templateName}`, templateData);
    },

    delete(templateName) {
        return $axios.delete(`${resource}?name=${templateName}`);
    }

})