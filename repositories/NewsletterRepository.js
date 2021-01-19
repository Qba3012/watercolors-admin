const resource = '/mail/newsletter';

export default ($axios) => ({
    
    all() {
        return $axios.get(`${resource}`);
    },

    send(payload) {
        return $axios.post(`${resource}`, payload);
    },

    delete(id) {
        return $axios.delete(`${resource}?id=${id}`);
    }

})