const localStorageMiddleware = () => (
    (next) => (action) => next(action)
);

export default localStorageMiddleware;
