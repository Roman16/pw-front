import React, {useRef} from "react";

const Button = (props) => {
    const buttonRef = useRef(null);

    function clickHandler(e) {
        let x = e.clientX - buttonRef.current.getBoundingClientRect().left;
        let y = e.clientY - buttonRef.current.getBoundingClientRect().top;

        let ripples = document.createElement('span');
        ripples.classList.add('ripple');

        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';

        buttonRef.current.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 500);

        props.onClick && props.onClick();
    }

    return (
        <button {...props} ref={buttonRef} onClick={clickHandler}>
            {props.children}
        </button>
    )
};

export default React.memo(Button);