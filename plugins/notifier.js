import { DEFAULT_ERROR_MESSAGE } from '~/utils/errorMessages';

export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ message = DEFAULT_ERROR_MESSAGE, success = false }) {
      store.commit('snackbar/showMessage', { message, success })
    }
  })
}