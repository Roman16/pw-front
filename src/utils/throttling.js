export function throttling(callback, limit) {

    let wait = false;
    return function () {
        if (!wait) {

            callback.apply(null, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}