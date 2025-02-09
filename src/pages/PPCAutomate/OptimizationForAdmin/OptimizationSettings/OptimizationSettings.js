import React, {useState} from "react"
import './OptimizationSettings.less'
import CustomSelect from "../../../../components/Select/Select"
import {Select, Spin} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {useDispatch, useSelector} from "react-redux"
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup"
import {productsActions} from "../../../../actions/products.actions"
import {SVG} from "../../../../utils/icons"
import CogsWindow from "./CogsWindow"
import {currencyWithCode} from "../../../../components/CurrencyCode/CurrencyCode"

const Option = Select.Option

export const strategies = [
    {
        name: 'ACoS Targeting',
        key: 'AchieveTargetACoS',
        icon: 'acos-targeting',
        fill: '#EC7F5C',
        disabled: false,
    },
    {
        name: 'Product Launch',
        key: 'LaunchProduct',
        icon: 'product-launch',
        fill: '#6D6DF6',
        disabled: true,
    },
    {
        name: 'Organic Sales Growth',
        key: 'BoostOverallProfit',
        icon: 'organic-sales-growth-icon',
        fill: '#7DD4A1',
        disabled: true,
    },
    {
        name: 'Revenue Growth',
        key: 'GrowOverallSales',
        icon: 'revenue-growth-icon',
        fill: '#F0B849',
        disabled: true,
    },
    {
        name: 'Profitable PPC',
        key: 'BoostPPCProfit',
        icon: 'profitable-ppc-icon',
        fill: '#4DBEE1',
        disabled: true,
    },
]


const OptimizationSettings = ({product, isDisabled, onUpdateField, onShowDescription, onStop, processing, hasVariations, onSetCogs}) => {
    const [visibleCogsWindow, setVisibleCogsWindow] = useState(false)
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

                    {product.status === 'RUNNING' && <button
                        className={'btn blue'}
                        disabled={processing}
                        onClick={confirmStopOptimization}
                    >
                        <div className={'icon'}/>

                        Stop Optimization

                        {processing && <Spin size={'small'}/>}
                    </button>}
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">
                            Choose Strategy
                            <a onClick={onShowDescription}>Read more</a>
                        </div>

                        <CustomSelect
                            getPopupContainer={trigger => trigger}
                            value={product.optimization_strategy}
                            onChange={(value) => onUpdateField('optimization_strategy', value)}
                        >
                            <Option value={null}>No Optimization</Option>
                            {strategies.map(item => (
                                <Option value={item.key} disabled={item.disabled}>
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
                            value={product.min_bid_manual_campaign}
                            onChange={(value) => onUpdateField('min_bid_manual_campaign', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Enter your target ACoS</div>

                        <InputCurrency
                            value={product.desired_target_acos}
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
                            value={product.max_bid_manual_campaign}
                            onChange={(value) => onUpdateField('max_bid_manual_campaign', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">CoGS</div>

                        <div
                            className={`cogs-field`}
                            onClick={() => setVisibleCogsWindow(true)}
                        >
                            <InputCurrency
                                value={product.default_variation && product.default_variation.cogs}
                                disabled
                            />

                            <button className="btn icon edit-btn">
                                <SVG id={'edit-pen-icon'}/>
                            </button>
                        </div>

                    </div>

                    <div className="form-group">
                        <div className="label">Min Bid (Auto Campaign)</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.min_bid_auto_campaign}
                            onChange={(value) => onUpdateField('min_bid_auto_campaign', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Product Price</div>

                        <p className={'product-price'}>
                            {product.default_variation && product.default_variation.item_price !== null && currencyWithCode(product.default_variation.item_price)} (retrieved
                            from Amazon)</p>
                    </div>

                    <div className="form-group">
                        <div className="label">Max Bid (Auto Campaign)</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.max_bid_auto_campaign}
                            onChange={(value) => onUpdateField('max_bid_auto_campaign', value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <div className="label">Overwrite Product Price</div>

                        <InputCurrency
                            disabled={isDisabled}
                            value={product.default_variation && product.default_variation.item_price_from_user}
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

            <CogsWindow
                visible={visibleCogsWindow}
                productId={product.default_variation && product.default_variation.id}
                // productId={product.product_id}
                product={product.default_variation}
                onSetCogs={onSetCogs}
                setCurrentCogs={onUpdateField}
                onClose={() => {
                    setVisibleCogsWindow(false)
                }}
            />
        </>
    )
}

export default OptimizationSettings
