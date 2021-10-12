import React from "react"
import './StepActions.less'
import ProductItem from "../SelectProduct/ProductItem"
import {Spin} from "antd"

const StepActions = ({product, currentStep, createProcessing, disabled, onChangeStep}) => {
    return (
        <div className="zth-step-actions">
            {product.id && <ProductItem
                key={product.id}
                product={product}
                onSelect={() => {}}
                onSelectParent={() => {}}
            />}

            {currentStep > 0 && <button
                className="sds-btn white"
                disabled={createProcessing}
                onClick={() => onChangeStep(currentStep - 1)}
            >
                Back
            </button>}

            <button
                className="sds-btn default"
                disabled={!product.id || createProcessing || disabled}
                onClick={() => onChangeStep(currentStep + 1)}
            >
                {currentStep === 3 ? 'Create' : 'Next'}
                {createProcessing && <Spin size={'small'}/>}
            </button>
        </div>
    )
}

export default StepActions