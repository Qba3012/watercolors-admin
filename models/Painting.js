export default class Painting{
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.category = data.category;
        this.createDateTime = data.createDateTime;
        this.availability = data.availability;
        this.price = data.price;
        this.tags = data.tags;
        this.mainImage = data.mainImage;
    }
}