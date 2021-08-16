import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import moment from "moment"
import '../CogsWindow/CogsWindow.less'
import {SVG} from "../../../../utils/icons"
import {numberMask} from "../../../../utils/numberMask"
import {productsServices} from "../../../../services/products.services"


const AmazonFeeWindow = ({visible, productId, onClose}) => {
    const [feesList, setFeesList] = useState([])

    useEffect(() => {
        if (productId && visible) {
            productsServices.getProductAmazonFees(productId)
                .then(res => {
                    setFeesList(res.result.sort((a, b) => moment(b.cogs_start_datetime).format('YYYYMMDDHHmm') - moment(a.cogs_start_datetime).format('YYYYMMDDHHmm')))
                })
        }
    }, [productId])


    useEffect(() => {
        setFeesList([])
    }, [visible])


    return (
        <>
            <ModalWindow
                visible={visible}
                footer={false}
                className={'cogs-window amazon-fees-window'}
                handleCancel={onClose}
                destroyOnClose={true}
            >
                <div className="window-header">
                    <h2>Amazon Fees History</h2>

                    <button className="btn icon" onClick={onClose}>
                        <SVG id={'close-window-icon'}/>
                    </button>
                </div>

                <ul>
                    {feesList.map((item, index) => <>
                        <div
                            className={`current-value`}>
                            <div className="add-new-item">
                                <div className="line"/>
                            </div>

                            <div className="value">{item.cogs_value && `${numberMask(item.cogs_value, 2)}$`}</div>
                        </div>

                        <li>
                            <>
                                <i/>
                                <div
                                    className="time">{moment(item.amazonGeneratedAtDateTime).format('DD MMM YYYY, HH:mm')},
                                </div>
                                <div className="value">{numberMask(item.TotalFeesEstimateValue, 2)}$</div>
                            </>
                        </li>
                    </>)}
                </ul>
            </ModalWindow>
        </>
    )
}

export default AmazonFeeWindow