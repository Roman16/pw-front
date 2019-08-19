import React from 'react';

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
