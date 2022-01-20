export const numberMask = (value, n, x, minFix) => {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')'

    if(minFix) {
        const restLength = value.toString().split('.')[1]
        return (+value).toFixed(Math.max(0, ~~!!restLength && restLength.length >= n ? n : !!restLength && restLength.length <= 2 ? 2 : !restLength ? 2 : restLength.length)).replace(new RegExp(re, 'g'), '$&,')
    } else {
        return (+value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
    }
}