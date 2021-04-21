import moment from "moment"
import tz from 'moment-timezone'

export const dateFormatting = (date) => {
    return date ? moment(date).endOf('day').tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ss.000Z') : undefined
}