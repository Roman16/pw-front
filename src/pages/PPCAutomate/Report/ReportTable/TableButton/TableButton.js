import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import './TableButton.less';

const TableButton = ({children, active, onClick, count, totalSize}) => {
    const [currentCount, setCount] = useState(active ? totalSize : count);

    useEffect(() => {
        setCount(active ? totalSize || count : count)
    }, [count, totalSize]);

    return (
        <div className={`TableButton ${active ? 'active' : ''}`}>
            <Button onClick={onClick}>
                {children}

                {currentCount > 0 && <div className="tab-name-count">{currentCount}</div>}
            </Button>
        </div>
    );
};

TableButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    active: PropTypes.bool,
    onClick: PropTypes.func,
};
TableButton.defaultProps = {
    children: null,
    count: null,
    active: false,
    onClick: () => {
    }
};
export default TableButton;
