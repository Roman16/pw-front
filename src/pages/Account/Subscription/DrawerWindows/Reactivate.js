import React from 'react';
import moment from "moment";

const Reactivate = ({date}) => {
    return (
        <div>
            <h3 className="reactivate-title">Subscription Settings</h3>
            <p className="reactivate-text">
                Your account has been set to pause at the end of the billing cycle, and
                will resume on{' '}
                <span className="reactivate-data">{moment(date).format('MMMM DD, YYYY')}</span>
            </p>
        </div>
    );
};

export default Reactivate;
