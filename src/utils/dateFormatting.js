import moment from 'moment-timezone'

export const dateFormatting = (date) => {
    return date ? moment(date).endOf('day').format('YYYY-MM-DDTHH:mm:ss.000Z').replaceAll('+', '%2B') : undefined
}
export const dateRequestFormat = (date) => {
    return date ? `${moment(date).format('YYYY-MM-DDT23:59:59.999Z')}`.replaceAll('+', '%2B') : undefined
}