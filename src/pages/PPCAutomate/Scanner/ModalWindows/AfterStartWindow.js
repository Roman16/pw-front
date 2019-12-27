import React, {Fragment} from "react";
import warningImage from '../../../../assets/img/warning-image.svg';


const AfterStartWindow = ({onClose}) => (
    <Fragment>
        <img src={warningImage} alt=""/>

        <h2>Please, have a patience</h2>

        <span>It takes to 5 minutes to finish scanning your ads. <br/>
        Please don’t close this page until it finished.</span>

        <div className='actions'>
            <button className='btn white' onClick={onClose}>
                OK
            </button>
        </div>
    </Fragment>
);

export default AfterStartWindow;