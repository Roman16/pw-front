export function seo(data = {}) {
    data.title = data.title || 'Sponsoreds'
    data.metaDescription = data.metaDescription || 'Sponsoreds'

    document.title = data.title
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription)
}