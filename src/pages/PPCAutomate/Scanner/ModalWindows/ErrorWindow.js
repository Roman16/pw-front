import React, {Fragment} from "react";
import {SVG} from "../../../../utils/icons";

const ErrorWindow = ({onClose}) => (
    <Fragment>
        <SVG id={'scanner-warning'}/>

        <h2>Warning</h2>

        <p>
            We can not find any ads data for the selected product :( <br/>
            Please, select another product or try again later.
        </p>

        <div className='actions'>
            <button className='btn default' onClick={onClose}>
                Ok
            </button>
        </div>
    </Fragment>

);

export default ErrorWindow;