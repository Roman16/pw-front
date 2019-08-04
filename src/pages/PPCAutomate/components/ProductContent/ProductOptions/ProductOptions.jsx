import React, { Component } from 'react';
import './ProductOptions.less';
import OptimizeOptions from './OptimizeOptions';
import OptimizeStrategy from './OptimizeStrategy';
import OptimizeCaption from './OptimizeCaption';

class ProductOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="ProductOptions">
                <OptimizeCaption />
                <div className="options">
                    <OptimizeOptions />
                    <OptimizeStrategy />
                </div>

            </div>

        );
    }
}

ProductOptions.propTypes = {};

ProductOptions.defaultProps = {};

export default ProductOptions;
