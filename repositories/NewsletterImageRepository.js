const resource = '/mail/newsletter/images';

export default ($axios) => ({
    
    all() {
        return $axios.get(`${resource}`);
    },

    create(formData) {
        return $axios.post(`${resource}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    delete(imageName) {
        return $axios.delete(`${resource}/${imageName}`);
    }

})