import React from "react";
import {Select} from "antd";
import './Select.less';
import {SVG} from "../../utils/icons";

const CustomSelect = (props) => {
    const {
        onChange,
        defaultValue,
        dropdownClassName,
        className
    } = props;

    return (
        <Select
            {...props}
            onChange={onChange}
            defaultValue={defaultValue}
            suffixIcon={<SVG id='select-icon'/>}
            className={`custom-select ${className}`}
            dropdownClassName={dropdownClassName}
        >
            {props.children}
        </Select>
    )
};

export default CustomSelect;