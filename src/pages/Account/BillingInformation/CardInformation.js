import React from "react"
import cardInfoIcon from '../../../assets/img/account/credi-card-information-icon.svg'
import billingInfoIcon from '../../../assets/img/account/billing-information-icon.svg'

const CardInformation = () => {

    return (<section>
        <div className="container">
            <i>
                <img src={cardInfoIcon} alt=""/>
            </i>

            <div className="col">
                <h3>Credit Card information</h3>
                <p>You can update your credit card information here.</p>
            </div>
        </div>

        <div className="container">
            <i>
                <img src={billingInfoIcon} alt=""/>
            </i>

            <div className="col">
                <h3>Billing Information</h3>
                <p>You can update your billing information here.</p>
                
                <div className="form-group">
                    <label htmlFor="">Full Name</label>
                    <input type="text" placeholder={'Full Name'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Billing Address</label>
                    <input type="text" placeholder={'Billing Address'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">City / Zip Code</label>
                    <input type="text" placeholder={'City'}/>
                    <input type="text" placeholder={'Zip Code'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Country</label>
                    <input type="text" placeholder={'Country'}/>
                </div>

                <button className="btn default">
                    Save Changes
                </button>
            </div>
        </div>
    </section>)
}

export default CardInformation