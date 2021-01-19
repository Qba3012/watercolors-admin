import {createMenuItem} from '../models/MenuItem';

export const MENU = [
    createMenuItem(
        {
            icon: 'mdi-email-outline',
            title: 'Newsletter',
            to: '/newsletter'
        }
    ),
    createMenuItem(
        {
            icon: 'mdi-image-outline',
            title: 'Obrazy',
            to: '/obrazy'
        }
    ),
    createMenuItem(
        {
            icon: 'mdi-account-multiple',
            title: 'Subskrybenci',
            to: '/subskrypcja'
        }
    ),
    createMenuItem(
        {
            icon: 'mdi-email-newsletter',
            title: 'Templatki',
            to: '/formy'
        }
    )
]