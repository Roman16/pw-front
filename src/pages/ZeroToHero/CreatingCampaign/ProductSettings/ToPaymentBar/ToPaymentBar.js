import React from "react";
import {totalPriceRender} from "../../../Payment/Payment";
import {Spin} from "antd";

const ToPaymentBar = ({onCreate, productAmount, processing, availableTokens}) => {
    return (
        <div className="next-step">
            <p> Campaign type: <b>Sponsored Products</b></p>

            {/*{!availableTokens && <div className="total">*/}
            {/*    You’ll be charged <b>{totalPriceRender(productAmount)}</b> for <b>{productAmount}</b> Products*/}
            {/*</div>}*/}

            <button
                className={'btn green-btn p-70'}
                onClick={onCreate}
                disabled={processing}
            >
                Create ZTH

                {processing && <Spin size={'small'}/>}
            </button>
        </div>
    )
};

export default ToPaymentBar;