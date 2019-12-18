import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import './TableButton.less';

const TableButton = ({children, active, onClick, count = {count: 0}, totalSize, loading}) => {
    const [currentCount, setCount] = useState(active ? totalSize : count.count);

    useEffect(() => {
        setCount(active && !loading ? totalSize || count.count : count.count)
    }, [count, totalSize]);

    return (
        <div className={`TableButton ${active ? 'active' : ''}`}>
            <Button onClick={onClick}>
                {children}

                {currentCount > 0 && <div className="tab-name-count">{currentCount}</div>}

                {count.hasNewReport && <div className='new-count'>New</div>}
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
