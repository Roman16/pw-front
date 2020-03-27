import React, {Fragment} from "react";
import successImage from "../../../../assets/img/checked-image.svg";

const SuccessWindow = ({onClose}) => (
    <Fragment>
        <img src={successImage} alt=""/>

        <h2>Success</h2>

        <span>You can check the report now</span>

        <div className='actions'>
            <button className='btn default' onClick={onClose}>
                OK
            </button>
        </div>
    </Fragment>

);

export default SuccessWindow;