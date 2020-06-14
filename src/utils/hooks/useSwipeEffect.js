export const useSwipeEffect = (leftSwipe, rightSwipe) => {
    //------------------------
    //swipe event handler
    let xDown = null;
    let yDown = null;

    const handleTouchStart = (evt) => {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    const swipeCardHandler = (evt) => {
        if (!xDown || !yDown) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;


        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                /* left swipe */
                rightSwipe();
            } else {
                /* right swipe */
                leftSwipe();
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };

    return [handleTouchStart, swipeCardHandler]
};