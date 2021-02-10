import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "./ProductItem";
import {zthActions} from "../../../../actions/zth.actions";
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup";

const SelectedProduct = () => {
    const [openedProduct, setOpenedProduct] = useState(null),
        [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false),
        [removedProduct, setRemovedProduct] = useState(null);

    const {productAmount, selectedProducts} = useSelector(state => ({
        productAmount: state.zth.productAmount,
        selectedProducts: state.zth.selectedProducts
    }));

    const dispatch = useDispatch();

    const openVariationsListHandler = (id) => setOpenedProduct(prevState => prevState === id ? null : id);

    const removeProductHandler = (index) => {
        setRemovedProduct(index);
        setVisibleConfirmWindow(true);
    };

    const removeProduct = () => {
        dispatch(zthActions.removeProduct(removedProduct));
        setVisibleConfirmWindow(false);
    };

    return (
        <>
            <div className="col selected-products">
                <div className="header-block">
                    <h3>
                        Available Products to Setup
                        <span className="count">{productAmount}</span>
                    </h3>

                    <div className='selected-products-count'>
                        <div className={'added-count'}><b>{selectedProducts.length}</b> products added</div>

                        {selectedProducts.length > 0 && <button
                            className="remove-all-btn"
                            onClick={() => removeProductHandler('all')}
                        >
                            Remove all
                        </button>}
                    </div>
                </div>


                <div className="products-list">
                    {selectedProducts.map((product, index) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            isOpened={product.id === openedProduct}

                            onOpenVariations={openVariationsListHandler}
                            onRemove={() => removeProductHandler(index)}
                        />
                    ))}
                </div>
            </div>

            <ConfirmActionPopup
                className={'confirm-remove-product-window'}
                visible={visibleConfirmWindow}
                title={removedProduct === 'all' ? 'Are you sure you want to delete All products?' : 'Are you sure you want to delete the product?'}
                handleOk={removeProduct}
                handleCancel={() => setVisibleConfirmWindow(false)}
            />
        </>
    )
};

export default SelectedProduct;
