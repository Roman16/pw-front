import React from 'react';

const CancelAccountWindow = () => {
    return (
        <div className="cancel">
            <h3 className="reactivate-title">Do you want to leave?</h3>
            <p className="reactivate-text">
                This action will result in canceling your subscription <br/> plan. We will pause optimization after you cancel.
            </p>
        </div>
    );
};

export default CancelAccountWindow;
