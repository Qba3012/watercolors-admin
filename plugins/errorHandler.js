import Error from '~/models/Error';
import {ERROR_MESSAGES} from '~/utils/errorMessages';

export default function ({ $axios, app, store }) {
  $axios.onError(error => {
    let err;

    if (error.response && error.response.status === 400) {
        err = new Error(error.response);
    } else {
        err = new Error();
    }

    const message = ERROR_MESSAGES.get(err.message);
    
    app.$notifier.showMessage({message: message});
  })
}