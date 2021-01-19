import Vuex from 'vuex';
import paintings from './modules/paintings';
import newsletter from './modules/newsletter';
import newsletterImages from './modules/newsletterImages';
import templates from './modules/templates';
import images from './modules/images';
import tags from './modules/tags';
import snackbar from './modules/snackbar';
import dialog from './modules/dialog';

const createStore = () => {
    return new Vuex.Store({
        strict: process.env.NODE_ENV !== 'production',
        modules: {
            paintings,
            newsletter,
            newsletterImages,
            templates,
            images,
            tags,
            snackbar,
            dialog
        }
    })
}

export default createStore