import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';
import { productsActions } from '../../../../actions/products.actions';

import './OptimizationOptions.less';

export const CheckBoxItem = ({ text, value = '', checked, ...props }) => (
  <div className="check-box-item">
    <Checkbox checked={checked} {...props}>
      {text}
    </Checkbox>
  </div>
);

export const options = [
  {
    text: 'Keywords Bids Optimization',
    value: 'optimize_keywords',
    name: 'optimize_keywords',
    description: `The algorithm optimizes your keywords bid based on your product profitability and conversion rate and makes bid adjustment to get the best Ad position for your product possible.`
  },
  {
    text: 'Product Targetings (PAT) Bids Optimization',
    value: 'optimize_pats',
    name: 'optimize_pats',
    description: `Price aware algorithm optimizes your product attribute targetings (ASIN's, Categories) based on your Target ACoS and makes bid adjustments based on your historical data to reach your advertising goal.`
  },
  {
    text: 'Harvesting New Keywords',
    value: 'create_new_keywords',
    name: 'create_new_keywords',
    description: `The Software adds potential and already valid user search-terms as a new keywords to your PPC campaigns. The quality of the keywords is determined based on your Target ACoS, conversion rate, number of sales and other metrics.`
  },
  {
    text: 'Adding Negative Keywords',
    value: 'add_negative_keywords',
    name: 'add_negative_keywords',
    description: `Adding not relevant customer search terms that have unhealthy ACoS, or too many clicks and lack of sales, as negative keywords in the Auto and Broad campaigns to ensure you invest your money in the best keywords for your product.`
  },
  {
    text: 'Harvesting New Product Targetings',
    value: 'create_new_pats',
    name: 'create_new_pats',
    description: `The Software will search through your advertising reports to find profitable and relevant ASIN's and add them to your PPC campaign so you can steal traffic from your competitors.`
  },
  {
    text: 'Adding Negative Product Targetings',
    value: 'add_negative_pats',
    name: 'add_negative_pats',
    description: `The Software will add to Negatives your Product Targetings (ASIN's, Categories) that either have large ACoS or a significant number of clicks and lack of sales. This will ensure that your product is being shown only on competitors pages that convert into a purchase with a positive ROAS.`
  }
];

const delay = 500;
let timerIdSearch = null;

const OptimizationOptions = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const { defaultOptions, selectedAll } = useSelector(state => ({
    defaultOptions: state.products.defaultOptimizationOptions,
    selectedAll: state.products.selectedAll
  }));

  const [product, changeOptions] = useState(selectedProduct);

  const onChangeOptions = ({ target: { name, checked } }) => {
    changeOptions({
      ...product,
      [name]: checked
    });

    dispatch(productsActions.updateOptions({ [name]: checked }));

    clearTimeout(timerIdSearch);
    timerIdSearch = setTimeout(() => {
      if (product.status === 'RUNNING') {
        updateProduct({ ...product, [name]: checked });

        dispatch(
          productsActions.updateOptions({
            optimization_strategy: product.optimization_strategy,
            add_negative_keywords: product.add_negative_keywords,
            optimize_keywords: product.optimize_keywords,
            create_new_keywords: product.create_new_keywords,
            optimize_pats: product.optimize_pats,
            add_negative_pats: product.add_negative_pats,
            create_new_pats: product.create_new_pats,
            [name]: checked
          })
        );
      }
    }, delay);
  };

  const updateProduct = data => {
    dispatch(productsActions.updateProduct(data));
  };

  useEffect(() => {
    if (
      !selectedProduct.status ||
      selectedProduct.status === 'STOPPED' ||
      selectedAll
    )
      changeOptions(defaultOptions);
    else if (selectedProduct.status === 'RUNNING')
      changeOptions(selectedProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAll, selectedProduct.id]);

  return (
    <div className="optimize-options">
      <div className="options-content">
        {options.map(({ text, value, name }, index) => (
          <CheckBoxItem
            key={`${value}_${index}`}
            text={text}
            value={value}
            name={name}
            checked={product && product[name]}
            onChange={onChangeOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default OptimizationOptions;
