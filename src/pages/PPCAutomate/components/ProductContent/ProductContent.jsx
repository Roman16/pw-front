import React, { Component } from 'react';
import OptimizeOptions from './ProductOptions';
import ProductStatus from './ProductStatus';
import Terminal from './Terminal';
import './ProductContent.less';


class ProductContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLess: false,

        };
    }

    toLess = () => {
        this.setState(({ isLess }) => ({ isLess: !isLess }));
    };

    render() {
        const { isLess } = this.state;
        const {
            productIdData, productIdData: {
                status, created_at, total_changes, today_changes,
            }, updateProductIdData, saveProductIdData,
            lastChanges, inValidError,
        } = this.props;


        return (
            <div>
                <OptimizeOptions
                    isLess={isLess}
                    toLess={this.toLess}
                    productIdData={productIdData}
                    inValidError={inValidError}
                    updateProductIdData={updateProductIdData}
                />
                <ProductStatus
                    updateProductIdData={updateProductIdData}
                    status={status}
                    createdAt={created_at}
                    totalChanges={total_changes}
                    todayChanges={today_changes}
                    inValidError={inValidError}
                    saveProductIdData={saveProductIdData}
                />
                <Terminal isLess={isLess} lastChanges={lastChanges} />
            </div>
        );
    }
}

ProductContent.propTypes = {};

ProductContent.defaultProps = {};

export default ProductContent;
