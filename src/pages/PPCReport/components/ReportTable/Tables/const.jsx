import React from 'react';
import { Tooltip, Icon } from 'antd';

export const indexField = {
    title: '',
    dataIndex: 'index',
    key: 'index',
    width: '40px',
    render(...[, , index]) {
        return (
            <div>
                {index + 1}
            </div>
        );
    },
};

export const dateField = {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
};

export const actionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    className: 'left-border',
};
export const infoField = {
    title: '',
    dataIndex: 'info',
    key: 'info',
    render: (text) => (
        <Tooltip
            placement="bottom"
            title={text}
        >
            <Icon type="info-circle" className="info-icon" theme="filled" />
        </Tooltip>
    ),

};
