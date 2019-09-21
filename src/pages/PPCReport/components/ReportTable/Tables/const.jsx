import React from 'react';
import { Tooltip, Icon } from 'antd';
import moment from 'moment';

export const indexField = {
    title: '',
    dataIndex: 'id',
    key: 'id',
    width: '40px',
};

export const dateField = {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (
        moment(text)
            .format('Y/M/D')
    ),
};

export const actionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    className: 'left-border',
    render: (text) => (
        <div>
            <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    ),
};
export const infoField = {
    title: '',
    dataIndex: 'info',
    key: 'info',
    render: (text) => (
        <Tooltip
            placement="bottom"
            title={(
                <span dangerouslySetInnerHTML={{ __html: text }} />

            )}
        >
            <Icon type="info-circle" className="info-icon" theme="filled" />
        </Tooltip>
    ),

};
