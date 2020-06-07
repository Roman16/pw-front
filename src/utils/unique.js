export const unique = (string) => {
    const split = (...args) => [].concat.apply([], args).join(' ').split(/\W+/);

    return [...new Set(split(...string.split(" ")))];
};