import React from "react";
import {totalPriceRender} from "../../../Payment/Payment";

const ToPaymentBar = ({goPaymentStep, productAmount}) => {


    return (
        <div className="next-step">
            <p> Campaign type: <b>Sponsored Products</b></p>

            <div className="total">
                You’ll be charged <b>{totalPriceRender(productAmount)}</b> for <b>{productAmount}</b> Products
            </div>

            <button className={'btn green-btn p-70'} onClick={goPaymentStep}>Proceed to payment</button>
        </div>
    )
};

export default ToPaymentBar;