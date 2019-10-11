import React, { Component } from 'react';
import Checkbox /* , { Group } */ from '../../../../../../components/Checkbox';
import './OptimizeOptions.less';

export const CheckBoxItem = ({ text, value = '', ...props }) => (
    <div className="CheckBoxItem">
        <Checkbox value={value} {...props}>
            {text}
        </Checkbox>
    </div>
);
// add_negative_keywords,
//     add_negative_pats,
//     create_new_pats,
//     optimize_keywords,
//     optimize_pats
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

class OptimizeOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { optionsValue, onChange } = this.props;

        return (
            <div className="OptimizeOptions">
                {options.map(({ text, value, name }) => (
                    <CheckBoxItem
                        key={text}
                        text={text}
                        value={value}
                        name={name}
                        checked={optionsValue[name]}
                        onChange={onChange}
                    />
                ))}
            </div>
        );
    }
}

OptimizeOptions.propTypes = {};

OptimizeOptions.defaultProps = {};

export default OptimizeOptions;
