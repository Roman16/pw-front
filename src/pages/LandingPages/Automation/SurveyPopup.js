import React, {useEffect} from "react";
import image from '../../../assets/img/landing-automation/modal-img.svg';


const SurveyPopup = () => {

    function onClose() {
        document.querySelector('.survey-modal-window').classList.add('closed');
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.survey-modal-window').classList.add('opened')
        }, 1000 * 10);

        document.addEventListener('scroll', () => {
            const pageYOffset = window.pageYOffset;

            if (pageYOffset > 3000) {
                document.querySelector('.survey-modal-window').classList.add('opened')
            }
        });
    }, []);

    return (
        <div className="survey-modal-window">
            <img src={image} alt=""/>
            <span className="description"><span>Take the part in our Amazon Ad Survey!</span>
			<h2>Get a chance to win $100 Amazon Gift Card!</h2></span>
            <div className="buttons">
                <button className="handle-ok"
                        onClick={() => window.open('https://profit-whales.typeform.com/to/a2XOe5')}>take
                    a
                    survey!
                </button>
                <button className="handle-cancel" onClick={onClose}>&times;</button>
            </div>
        </div>
    )
};

export default SurveyPopup;