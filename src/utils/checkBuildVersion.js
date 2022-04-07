import {userService} from "../services/user.services"

export const checkBuildVersion = async () => {
    try {
        const res = await userService.getIndexHtml()

        if (res.data && (getMeta(res.data) !== getMeta()) && (window.location.host !== 'localhost:3000')) {
            localStorage.removeItem('analyticsMetricsState')
            localStorage.removeItem('analyticsFiltersList')
            localStorage.removeItem('analyticsChartState')
            localStorage.removeItem('analyticsColumnsOrder')
            localStorage.removeItem('analyticsSorterColumn')

            document.location.reload()
        }
    } catch (e) {

    }
}

const createElementFromHTML = (htmlString) => {
    const div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    return div
}

const getMeta = (htmlString = '') => {
    const html = createElementFromHTML(htmlString)

    const metas = htmlString ? [...html.getElementsByTagName('meta')] : [...document.getElementsByTagName('meta')]
    const metaVersion = metas.find(i => i.getAttribute('build-version'))

    if (metaVersion) {
        return metaVersion.getAttribute('build-version')
    }

    return false
}
