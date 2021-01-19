export class MenuItem {
    constructor({icon = '', title = '', to = '/'} = {}) {
        this.icon = icon;
        this.title = title;
        this.to = to;
    }
}

export function createMenuItem(data) {
    return Object.freeze(new MenuItem(data));
}