import React, {Fragment} from "react";

const AfterStartWindow = ({onClose}) => (
    <Fragment>
        <h2>Please, have a patience</h2>

        <p>It takes to 5 minutes to finish scanning <br/> your ads.
        Please don’t close this page until <br/> it finished.</p>

        <div className='actions'>
            <button className='btn default' onClick={onClose}>
                Ok
            </button>
        </div>
    </Fragment>
);

export default AfterStartWindow;