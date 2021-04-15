import moment from "moment"
import tz from 'moment-timezone'

export const dateFormatting = (date) => {
    return date ? moment(date).tz('America/Los_Angeles').toISOString() : undefined
}