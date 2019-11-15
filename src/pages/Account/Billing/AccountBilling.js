import React from "react";

const AccountBilling = ({onOpenWindow}) => {

    return (
        <section className='account-billing-block'>
            <div className='block-description'>
                <h3>
                    Account billing
                </h3>

                <span>
                    Your bills are paid using your active <br/> payment method
                </span>
            </div>

            <button className='btn green-btn' onClick={() => onOpenWindow('newCard')}>
                {/*Update payment method*/}
                Add card
            </button>
        </section>
    )
};

export default AccountBilling;