import React, { Component } from 'react';
import Checkbox from '../../../../../../components/Checkbox';
import './OptimizeOptions.less';

const CheckBoxItem = ({ text, value = '' }) => (
    <div className="CheckBoxItem">
        <Checkbox value={value}>{text}</Checkbox>
    </div>
);

const options = [
    {
        text: 'Create new keywords',
        value: '',
    }, {
        text: 'Add Negative',
        value: '',
    }, {
        text: 'Optimize Bids',
        value: '',
    }, {
        text: 'Pause Bad Keywords',
        value: '',
    }, {
        text: 'Optimize PAT Compaign',
        value: '',
    }, {
        text: 'Negative keywords creation',
        value: '',
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
