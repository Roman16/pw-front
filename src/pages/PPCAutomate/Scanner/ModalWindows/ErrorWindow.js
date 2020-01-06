import React, {Fragment} from "react";
import warningImage from '../../../../assets/img/warning-image.svg';

const ErrorWindow = ({onClose}) => (
    <Fragment>
        <img src={warningImage} alt=""/>

        <h2>Warning</h2>

        <span>
            We can not find any ads data for the selected product :( <br/>
            Please, select another product or try again later.
        </span>

        <div className='actions'>
            <button className='btn white' onClick={onClose}>
                OK
            </button>
        </div>
    </Fragment>

);

export default ErrorWindow;