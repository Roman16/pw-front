import {round} from "./round"

export const numberMask = (value, n, x, afterCut) => {
    if (afterCut !== undefined) {
        let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (afterCut > 0 ? '\\.' : '$') + ')'
        const restValue = round(+`0.${value.toString().split('.')[1] || 0}`, afterCut)

        return (+value).toFixed(Math.max(0, ~~afterCut)).replace(new RegExp(re, 'g'), '$&,').split('.')[0] + (restValue !== 0 && !!restValue.toString().split('.')[1]? `.${restValue.toString().split('.')[1]}` : '')
    } else {
        let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')'

        return (+value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
    }
}