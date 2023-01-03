import {userService} from "../services/user.services"
import {notification} from "../components/Notification"

window.onload = function () {
    const reloading = sessionStorage.getItem("reloading")
    if (reloading) {
        sessionStorage.removeItem("reloading")
        notification.success({
            title: 'Congratulations!',
            description: 'Your app has just been updated to the latest version!',
            autoClose: 10000
        })
    }
}

export const checkBuildVersion = async () => {
    try {
        const res = await userService.getIndexHtml()

        if (res.data && (getMeta(res.data) !== getMeta()) && (window.location.host !== 'localhost:3000')) {
            localStorage.removeItem('analyticsMetricsState')
            localStorage.removeItem('analyticsFiltersList')
            localStorage.removeItem('analyticsChartState')
            localStorage.removeItem('analyticsColumnsOrder')
            localStorage.removeItem('analyticsSorterColumn')

            sessionStorage.setItem("reloading", "true")
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
