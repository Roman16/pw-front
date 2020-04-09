import React, {Fragment} from "react";
import {SVG} from "../../../../utils/icons";

const SuccessWindow = ({onClose}) => (
    <Fragment>
        <SVG id={'scanner-success'}/>

        <h2>Success</h2>

        <p>You can check the report now</p>

        <div className='actions'>
            <button className='btn default' onClick={onClose}>
                Ok
            </button>
        </div>
    </Fragment>

);

export default SuccessWindow;