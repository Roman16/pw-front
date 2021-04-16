export const round = (value, places) => {
    return +(Math.round((+value + Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places));
};
