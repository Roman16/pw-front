let timeout = null;

export const hold = (func, delay) => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        func();
    }, delay);

    return timeout;
};