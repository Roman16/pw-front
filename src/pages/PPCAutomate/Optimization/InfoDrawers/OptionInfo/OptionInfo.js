import React, { Component } from 'react';
import './OptionInfo.less';

class OptionInfo extends Component {
    render() {
        return (
            <div className="OptionInfo">
                {/*{options.map(({ text, description }) => (*/}
                {/*    <div style={{ marginBottom: '20px' }} key={text}>*/}
                {/*        <CheckBoxItem text={text} checked />*/}
                {/*        <div>{description}</div>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        );
    }
}

OptionInfo.propTypes = {};

OptionInfo.defaultProps = {};

export default OptionInfo;
