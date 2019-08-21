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
            title="Changed bid for exact keyword Keyword Text in ad group Ad Group Name in campaign Campaign Name from 2$ to 2.1$ (up 0.1$ or 5%) based on keyword ACoS 20%, 100 clicks and product target ACoS: 45% (calculated based on your product margin: 30% and selected optimization strategy: FastPPCLaunch)."
        >
            <Icon type="info-circle" className="info-icon" theme="filled" />
        </Tooltip>
    ),

};
