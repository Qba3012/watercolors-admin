const resource = '/catalogue/paintings';

export default ($axios) => ({
    
    all() {
        return $axios.get(`${resource}`);
    },
      
    getById(id) {
        return $axios.get(`${resource}/${id}`);
    },

    create(payload) {
        return $axios.post(`${resource}`, payload);
    },

    update(payload) {
        return $axios.put(`${resource}`, payload);
    },

    delete(id) {
        return $axios.delete(`${resource}/${id}`);
    }

})