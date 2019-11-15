import React from "react";

const AccountBilling = () => {

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

            <button className='btn green-btn'>
                Update payment method
            </button>
        </section>
    )
};

export default AccountBilling;