import React from 'react';

import ProductsList from './ProductsList/ProductsList';
import FreeTrial from '../../../components/FreeTrial/FreeTrial';
import './ProductSettings.less';

const ProductSettingsMain = () => {
    return (
        <div className="product-settings-page">
            <div className="page-caption">
                <h3> Analytics Product Settings</h3>
                <FreeTrial />
            </div>

            <div className="reminder">
                <div className="reminder-title">Reminder</div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque augue eros, convallis a est id, sodales
                    vulputate nisi. Cras dignissim porttitor tortor ut laoreet.
                    Nam in metus id nunc eleifend lacinia ut nec mauris. Nunc
                    posuere sit amet tortor ac laoreet. Pellentesque blandit
                    fringilla ultricies.
                </div>
            </div>

            <ProductsList />
        </div>
    );
};

export default ProductSettingsMain;
