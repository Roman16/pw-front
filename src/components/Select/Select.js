import React from "react";
import {Popover, Select} from "antd";
import selectIcon from "../../assets/img/icons/select-icon.svg";
import './Select.less';

const CustomSelect = (props) => {
    const {
        onChange,
        defaultValue,
        dropdownClassName,
        value
    } = props;

    return (
        <Select
            onChange={onChange}
            defaultValue={defaultValue}
            suffixIcon={<img src={selectIcon} alt=""/>}
            className="custom-select"
            dropdownClassName={dropdownClassName}
            getPopupContainer={trigger => trigger.parentNode}
            value={value}
        >
            {props.children}
        </Select>
    )
};

export default CustomSelect;