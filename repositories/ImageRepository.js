const resource = '/catalogue/images';

export default ($axios) => ({
    
    create(payload, id) {
        return $axios.post(`${resource}/${id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    
    delete(id, fileName) {
        return $axios.delete(`${resource}/${id}/${fileName}`);
    }

})