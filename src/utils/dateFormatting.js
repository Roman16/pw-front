import moment from 'moment-timezone'
import {activeTimezone} from "../pages"

export const dateFormatting = (date, type='end') => {
    if(type === 'start') {
        return date ? `${moment(date).format('YYYY-MM-DD')}${moment().tz(activeTimezone).format('T00:00:00.000Z')}` : undefined
    } else {
        return date ? `${moment(date).format('YYYY-MM-DD')}${moment().tz(activeTimezone).format('T23:59:59.999Z')}` : undefined
    }
}
export const dateRequestFormat = (date) => {
    return date ? encodeURIComponent(`${moment(date).format('YYYY-MM-DDT23:59:59.999Z')}`) : undefined
}