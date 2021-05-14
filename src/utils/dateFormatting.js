import moment from 'moment-timezone'

export const dateFormatting = (date) => {
    return date ? moment(date).endOf('day').format('YYYY-MM-DDTHH:mm:ss.000Z') : undefined
}
export const dateRequestFormat = (date) => {
    return date ? `${moment(date).format('YYYY-MM-DD')}T23:59:59.999-07:00` : undefined
}