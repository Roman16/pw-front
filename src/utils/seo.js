export function seo(data = {}) {
    data.title = data.title || 'Profit Whales'
    data.metaDescription = data.metaDescription || 'Profit Whales'

    document.title = data.title
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription)
}