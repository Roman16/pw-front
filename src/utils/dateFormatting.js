import moment from "moment"
import tz from 'moment-timezone'

export const dateFormatting = (date) => {
    return date ? moment(date).tz('America/Los_Angeles').endOf('day').format('YYYY-MM-DDTHH:mm:ss.000Z') : undefined
}