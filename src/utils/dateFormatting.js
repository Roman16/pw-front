import moment from 'moment-timezone'

export const dateFormatting = (date) => {
    return date ? encodeURIComponent(moment(date).endOf('day').format('YYYY-MM-DDTHH:mm:ss.000Z')) : undefined
}
export const dateRequestFormat = (date) => {
    return date ? encodeURIComponent(`${moment(date).format('YYYY-MM-DDT23:59:59.999Z')}`) : undefined
}