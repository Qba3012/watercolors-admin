import TemplateData from '~/models/TemplateData';

export default class NewsletterRequest {
    constructor(request) {
        this.subject = request.subject;
        this.template = request.template;
        this.data = request.data?.map(d => new TemplateData(d));
    }
}