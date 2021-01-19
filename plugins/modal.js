export default ({ app, store }, inject) => {
  inject('modal', {
    showMessage ({ message = '', action = {}}) {
      store.commit('dialog/showMessage', { message, action })
    },
  })
}