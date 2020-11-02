import React, {Fragment, useState} from "react"
import './OptimizationSettings.less'
import CustomSelect from "../../../../components/Select/Select"
import {Select, Spin} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStop} from "@fortawesome/free-solid-svg-icons"
import {useDispatch, useSelector} from "react-redux"
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup"
import {productsActions} from "../../../../actions/products.actions"
import {SVG} from "../../../../utils/icons"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

const strategies = [
    {
        name: 'ACoS Targeting',
        key: 'AchieveTargetACoS',
        icon: 'acos-targeting',
        fill: '#EC7F5C'
    },
    {
        name: 'Product Launch',
        key: 'LaunchProduct',
        icon: 'product-launch',
        fill: '#6D6DF6'
    },
    {
        name: 'Organic Sales Growth',
        key: 'BoostOverallProfit',
        icon: 'organic-sales-growth-icon',
        fill: '#7DD4A1'
    },
    {
        name: 'Revenue Growth',
        key: 'GrowOverallSales',
        icon: 'revenue-growth-icon',
        fill: '#F0B849'
    },
    {
        name: 'Profitable PPC',
        key: 'BoostPPCProfit',
        icon: 'profitable-ppc-icon',
        fill: '#4DBEE1'
    },
]


const OptimizationSettings = ({product, isDisabled, onUpdateField, onShowDescription, onStop, processing}) => {
    const dispatch = useDispatch()

    const dontShowStopWindowAgain = useSelector(state => state.products.dontShowStopNotificationAgain)

    const [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false),
        [showAgainWindow, setShowAgainWindow] = useState(dontShowStopWindowAgain)

    const stopOptimizationHandler = () => {
        dispatch(productsActions.dontShowWindowAgain({
            windowName: 'STOP',
            status: showAgainWindow
        }))

        onStop()

        setVisibleConfirmWindow(false)
    }

    const confirmStopOptimization = () => {
        if (dontShowStopWindowAgain) {
            onStop()
        } else {
            setVisibleConfirmWindow(true)
        }
    }

    return (
        <>
            <section className={'optimization-settings-section'}>
                <div className="section-header">
                    <h2>Settings</h2>

                    <button
                        className={'btn default '}
                        disabled={product.status === 'STOPPED' || processing}
                        onClick={confirmStopOptimization}
                    >
                        <i>
                            {processing ? <Spin size={'small'}/> : <FontAwesomeIcon icon={faStop}/>}
                        </i>
                        Stop Optimization
                    </button>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">
                            Choose Strategy
                            <a onClick={onShowDescription}>Read more</a>
                        </div>

                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            value={product.optimization_strategy}
                            onChange={(value) => onUpdateField('optimization_strategy', value)}
                        >
                            <Option value={null}>No Optimization</Option>
                            {strategies.map(item => (
                                <Option value={item.key}>
                                    <i style={{fill: `${item.fill}`}}>
                                        <SVG id={item.icon}/>
                                    </i>

                                    {item.name}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>

                    <div className="form-group">
                        <div className="label">Min Bid (Manual Campaign)</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.min_manual_bid}
                            onChange={(value) => onUpdateField('min_manual_bid', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Enter your target ACoS</div>

                        <InputCurrency
                            value={product.c}
                            typeIcon={'percent'}
                            disabled={product.optimization_strategy !== 'AchieveTargetACoS'}
                            onChange={(value) => onUpdateField('desired_target_acos', value)}
                        />

                        <h4>
                            Only for ACoS Targeting Strategy
                        </h4>
                    </div>

                    <div className="form-group">
                        <div className="label">Max Bid (Manual Campaign)</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.max_manual_bid}
                            onChange={(value) => onUpdateField('max_manual_bid', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Net Margin</div>

                        <InputCurrency
                            typeIcon={'percent'}
                            value={product.product_margin_value}
                            disabled={isDisabled}
                            onChange={(value) => onUpdateField('product_margin_value', value)}
                        />
                    </div>

                    <div className="form-group">
                        <div className="label">Min Bid (Auto Campaign)</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.min_auto_bid}
                            onChange={(value) => onUpdateField('min_auto_bid', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Product Price</div>

                        <p className={'product-price'}>
                            {product.item_price !== null && `$${product.item_price} `}(retrieved from Amazon)</p>
                    </div>

                    <div className="form-group">
                        <div className="label">Max Bid (Auto Campaign)</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.max_auto_bid}
                            onChange={(value) => onUpdateField('max_auto_bid', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Overwrite Product Price</div>

                        <InputCurrency
                            value={product.item_price_from_user}
                            disabled={isDisabled}
                            onChange={(value) => onUpdateField('item_price_from_user', value)}
                        />
                    </div>
                    <div className="form-group">

                    </div>
                </div>

            </section>

            <ConfirmActionPopup
                visible={visibleConfirmWindow}
                handleOk={stopOptimizationHandler}
                handleCancel={() => setVisibleConfirmWindow(false)}
                handleChangeCheckbox={e => setShowAgainWindow(e.target.checked)}
                title={' Are you sure you want to stop?'}
                description={'We will stop the optimization of your active Amazon PPC campaigns. You can restart it anytime.'}
                checkboxText={`Don't show this message again`}
            />
        </>
    )
}

export default OptimizationSettings
