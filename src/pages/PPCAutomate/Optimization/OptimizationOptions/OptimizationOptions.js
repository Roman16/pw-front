import React, {Component} from 'react';
import {Checkbox, Icon} from "antd";

import './OptimizationOptions.less';

export const CheckBoxItem = ({text, value = '', checked, ...props}) => (

    <div className="check-box-item">
        <Checkbox
            checked={checked}
            {...props}
        >
            {text}
        </Checkbox>
    </div>
);

export const options = [
    {
        text: 'Create new keywords',
        value: 'create_new_pats',
        name: 'create_new_pats',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    },
    {
        text: 'Add Negative',
        value: 'add_negative_pats',
        name: 'add_negative_pats',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    },
    {
        text: 'Optimize Bids',
        value: 'optimize_pats',
        name: 'optimize_pats',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    },
    {
        text: 'Pause Bad Keywords',
        value: 'create_new_keywords',
        name: 'create_new_keywords',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    },
    {
        text: 'Optimize PAT Compaign',
        value: 'optimize_keywords',
        name: 'optimize_keywords',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    },
    {
        text: 'Negative keywords creation',
        value: 'add_negative_keywords',
        name: 'add_negative_keywords',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    },
];

class OptimizationOptions extends Component {
    state = {};

    render() {
        const {
            onChange,
            openInformation,
            product,
        } = this.props;

        return (
            <div className="optimize-options">
                <div className="product-info ">
                    <span> What do you want to automate</span>
                    <Icon type="info-circle" theme="filled" onClick={openInformation}/>
                </div>

                <div className='options-content'>
                    {options.map(({text, value, name}) => (
                        <CheckBoxItem
                            key={text}
                            text={text}
                            value={value}
                            name={name}
                            checked={product && product[name]}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default OptimizationOptions;
