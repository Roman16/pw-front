import React from "react";
import {Select} from "antd";
import './Select.less';
import {SVG} from "../../utils/icons";

const CustomSelect = (props) => {
    const {
        onChange,
        defaultValue,
        dropdownClassName,
    } = props;

    return (
        <Select
            {...props}
            onChange={onChange}
            defaultValue={defaultValue}
            suffixIcon={<SVG id='select-icon'/>}
            className="custom-select"
            dropdownClassName={dropdownClassName}
        >
            {props.children}
        </Select>
    )
};

export default CustomSelect;