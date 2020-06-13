export const unique = (string) => {
    const split = (...args) => [].concat.apply([], args).join(' ').split(/\W+/);

    return [...new Set(split(...string.split(" ")))];
};

export const uniqueArrOfObj = (arr, key) => {
    return arr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
};
