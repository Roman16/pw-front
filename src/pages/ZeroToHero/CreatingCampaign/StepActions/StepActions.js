import React from "react"
import './StepActions.less'
import ProductItem from "../SelectProduct/ProductItem"

const StepActions = ({product, currentStep, onChangeStep}) => {
    return (
        <div className="zth-step-actions">
            {product && <ProductItem
                key={product.id}
                product={product}
                // isOpened={product.id === openedProduct}
                // isSelected={!!addedProducts.find(item => item.id === product.id)}
                // isDisabled={!!addedProducts.find(item => item.id === product.id)}
                // addedProducts={addedProducts}
                // addedProducts={addedProducts}

                // onSelect={selectProductHandler}
                // onSelectVariation={selectVariationHandler}
                // onOpenVariations={openVariationsListHandler}
            />}

            {currentStep > 0 && <button
                className="sds-btn white"
                onClick={() => onChangeStep(currentStep - 1)}
            >
                Back
            </button>}

            <button
                className="sds-btn default"
                disabled={!product}
                onClick={() => onChangeStep(currentStep + 1)}
            >
                Next
            </button>
        </div>
    )
}

export default StepActions