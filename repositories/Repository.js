import PaintingRepository from '~/repositories/PaintingRepository';
import ImageRepository from '~/repositories/ImageRepository';
import NewsletterRepository from '~/repositories/NewsletterRepository';
import NewsletterImageRepository from '~/repositories/NewsletterImageRepository';
import TemplateRepository from '~/repositories/TemplateRepository';

export default ($axios) => ({
    painting: PaintingRepository($axios),
    image: ImageRepository($axios),
    newsletter: NewsletterRepository($axios),
    newsletterImage: NewsletterImageRepository($axios),
    template: TemplateRepository($axios)
})