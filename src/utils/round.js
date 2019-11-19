export const round = (value, places) => {
    return +(Math.round(value + "e+" + places)  + "e-" + places);
};