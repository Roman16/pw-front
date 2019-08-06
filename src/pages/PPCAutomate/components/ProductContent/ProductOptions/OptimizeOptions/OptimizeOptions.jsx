import React, { Component } from 'react';
import Checkbox from '../../../../../../components/Checkbox';
import './OptimizeOptions.less';

export const CheckBoxItem = ({ text, value = '', ...props }) => (
    <div className="CheckBoxItem">
        <Checkbox value={value} {...props}>{text}</Checkbox>
    </div>
);

export const options = [
    {
        text: 'Create new keywords',
        value: '',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    }, {
        text: 'Add Negative',
        value: '',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    }, {
        text: 'Optimize Bids',
        value: '',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    }, {
        text: 'Pause Bad Keywords',
        value: '',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    }, {
        text: 'Optimize PAT Compaign',
        value: '',
        description: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.`,
    }, {
        text: 'Negative keywords creation',
        value: '',
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
        return (
            <div className="OptimizeOptions">
                {options.map(({ text, value }) => (
                    <CheckBoxItem key={text} text={text} value={value} />
                ))}
            </div>
        );
    }
}

OptimizeOptions.propTypes = {};

OptimizeOptions.defaultProps = {};

export default OptimizeOptions;
