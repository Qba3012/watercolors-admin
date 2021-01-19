import TemplateData from '~/models/TemplateData';

export default class Template{
    constructor(data) {
        this.data = data.data?.map(d => new TemplateData(d));
        this.html = data.html;
        this.name = data.name;
    }
}