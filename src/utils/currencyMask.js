export const currencyMask = (value) => {
  return (+value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};