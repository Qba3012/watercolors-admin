import Image from '~/models/Image';

export default class DetailedPainting{
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.category = data.category;
        this.collection = data.collection;
        this.createDateTime = data.createDateTime;
        this.availability = data.availability;
        this.height = data.height;
        this.width = data.width;
        this.price = data.price;
        this.tags = data.tags;
        this.images = data.images?.map(img => new Image(img));
    }
}