import React, {useState} from "react"
import './StartScanning.less'
import img from '../../../assets/img/scanner/start-scanning-img.svg'
import InputCurrency from "../../../components/Inputs/InputCurrency"
import CogsWindow from "../../PPCAutomate/OptimizationForAdmin/OptimizationSettings/CogsWindow"
import CustomSelect from "../../../components/Select/Select"
import {SVG} from "../../../utils/icons"
import {strategies} from "../../PPCAutomate/OptimizationForAdmin/OptimizationSettings/OptimizationSettings"
import {Select, Spin} from "antd"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

const Option = Select.Option


const StartScanning = ({
                           product,
                           startProcessing,
                           onStart,
                           onUpdateCogs,
                           onOpenStrategyDescription,
                           loadingProducts
                       }) => {

    const [visibleCogsWindow, setVisibleCogsWindow] = useState(false),
        [optimizationStrategy, setOptimizationStrategy] = useState('AchieveTargetACoS'),
        [targetAcos, setTargetAcos] = useState()

    return (<>
        <div className="start-scanning-section">
            <img src={img} alt=""/>
            <h2>Start scanning</h2>
            <p>
                Enter product information that will help PPC Audit <br/> to better analyze your Advertising performance
            </p>

            <div className={`form-group cogs ${(loadingProducts || !product.id) ? 'disabled' : ''}`}>
                <label htmlFor="">
                    Enter COGS

                    <InformationTooltip
                        description={'Cost of goods sold (CoGS) is the cost of acquiring or manufacturing one unit of product that you sell on Amazon during a particular period. Simply put, this is the cost you have to spend for one unit of product to end up in Amazon warehouse.'}
                    />
                </label>

                <InputCurrency
                    disabled
                    value={product.cogs_value}
                    onClick={() => (!loadingProducts && product.id) && setVisibleCogsWindow(true)}
                />
            </div>

            {/*<div className="form-group">*/}
            {/*    <label htmlFor="">*/}
            {/*        Choose Advertising goal*/}

            {/*        <span onClick={onOpenStrategyDescription}>Read more</span>*/}
            {/*    </label>*/}

            {/*    <CustomSelect*/}
            {/*        getPopupContainer={trigger => trigger}*/}
            {/*        value={optimizationStrategy}*/}
            {/*        onChange={(value) => setOptimizationStrategy(value)}*/}
            {/*        disabled={loadingProducts || !product.id}*/}
            {/*    >*/}
            {/*        {strategies.map(item => (*/}
            {/*            <Option value={item.key}>*/}
            {/*                <i style={{fill: `${item.fill}`}}>*/}
            {/*                    <SVG id={item.icon}/>*/}
            {/*                </i>*/}

            {/*                {item.name}*/}
            {/*            </Option>*/}
            {/*        ))}*/}
            {/*    </CustomSelect>*/}
            {/*</div>*/}

            {optimizationStrategy === 'AchieveTargetACoS' && <div className={`form-group acos ${(loadingProducts || !product.id) ? 'disabled' : ''}`}>
                <label htmlFor="">
                    Enter your target ACoS
                </label>

                <InputCurrency
                    disabled={loadingProducts || !product.id}
                    value={targetAcos}
                    typeIcon={'percent'}
                    onChange={(value) => setTargetAcos(value)}
                />
            </div>}

            <button
                className="btn default"
                onClick={() => onStart({
                    optimization_strategy: optimizationStrategy,
                    ...optimizationStrategy === 'AchieveTargetACoS' && {target_acos: targetAcos / 100}
                })}
                disabled={!product.cogs_value || !optimizationStrategy || (optimizationStrategy === 'AchieveTargetACoS' && !targetAcos) || startProcessing || loadingProducts}
            >
                Start scanning

                {startProcessing && <Spin size={'small'}/>}
            </button>

            <p className="rescan-description">
                <b>Note:</b> After starting new scanning the current scanning <br/> results will be lost.
            </p>
        </div>

        <CogsWindow
            visible={visibleCogsWindow}
            productId={product && product.id}
            product={product}
            onSetCogs={() => onUpdateCogs(product.id)}
            setCurrentCogs={() => {
            }}
            onClose={() => {
                setVisibleCogsWindow(false)
            }}
        />
    </>)
}


export default StartScanning