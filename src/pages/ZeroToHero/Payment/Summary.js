import React, {useState} from "react"
import {numberMask} from "../../../utils/numberMask"
import {Spin} from "antd"
import {SVG} from "../../../utils/icons"

const Summary = ({jobPrice, payProcessing}) => {
    const [openedRow, setOpenedRow] = useState()

    const openRowHandler = (row) => {
        setOpenedRow(row === openedRow ? undefined : row)
    }

    return (
        <div className="summary">
            <h2>Summary</h2>

            <div className="table">
                <div className="row header">
                    <div><span>#</span>Description</div>
                    <div>Amount</div>
                    <div>Unit Price</div>
                    <div>Total</div>
                </div>

                <div className="row">
                    <div><span>1</span>Fee</div>
                    <div></div>
                    <div></div>
                    <div>${numberMask(jobPrice.flat.summary.total_price_in_cents / 100, 2)}</div>
                </div>

                <div className={`row ${openedRow === 'keywords' ? 'active' : ''}`}>
                    <div><span>2</span>Keywords <button
                        type={'button'}
                        className={`sds-btn icon`}
                        onClick={() => openRowHandler('keywords')}>
                        <SVG id='select-icon'/>
                    </button></div>
                    <div>{jobPrice.keywords.summary.total_entities_count}</div>
                    <div>${numberMask(jobPrice.keywords.summary.total_average_price_in_cents_per_unit_rounded / 100, 2)}</div>
                    <div>${numberMask(jobPrice.keywords.summary.total_price_in_cents / 100, 2)}</div>
                </div>

               {openedRow === 'keywords' && <div className="description-list">
                    {jobPrice.keywords.details.map(i => <div className="row">
                        <div></div>
                        <div>{i.entities_count}</div>
                        <div>${numberMask(i.price_in_usd_cents / 100, 2)}</div>
                        <div>${numberMask(i.sum_price_in_cents / 100, 2)}</div>
                    </div>)}
                </div>}

                <div className={`row ${openedRow === 'asins' ? 'active' : ''}`}>
                    <div><span>3</span>ASINs <button
                        type={'button'}
                        className={`sds-btn icon`}
                        onClick={() => openRowHandler('asins')}>
                        <SVG id='select-icon'/>
                    </button></div>
                    <div>{jobPrice.product_targetings.summary.total_entities_count}</div>
                    <div>${numberMask(jobPrice.product_targetings.summary.total_average_price_in_cents_per_unit_rounded / 100, 4)}</div>
                    <div>${numberMask(jobPrice.product_targetings.summary.total_price_in_cents / 100, 4)}</div>
                </div>

                {openedRow === 'asins' && <div className="description-list">
                    {jobPrice.product_targetings.details.map(i => <div className="row">
                        <div></div>
                        <div>{i.entities_count}</div>
                        <div>${numberMask(i.price_in_usd_cents / 100, 4)}</div>
                        <div>${numberMask(i.sum_price_in_cents / 100, 4)}</div>
                    </div>)}
                </div>}
            </div>

            <div className="total-price">
                <div className={'label'}>TOTAL PRICE:</div>
                <div className="value">
                    ${numberMask(jobPrice.grand_total_price_in_cents / 100, 2)}
                </div>
            </div>

            {/*<div className="discount">*/}
            {/*    <div className="label">Discount:</div>*/}
            {/*    <div className="value">$500</div>*/}
            {/*</div>*/}
            {/*<div className="save">*/}
            {/*    <div className="label">You save:</div>*/}
            {/*    <div className="value">$500</div>*/}
            {/*</div>*/}

            <button
                className={'sds-btn default'}
                disabled={payProcessing}
            >
                Pay
                {payProcessing && <Spin size={'small'}/>}
            </button>
        </div>

    )
}

export default Summary