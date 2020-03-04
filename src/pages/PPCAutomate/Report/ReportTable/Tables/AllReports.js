import React from 'react';

export const allReports = () => {
    return ({
        columns: {
            ['all-reports']: [
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    width: '200px',
                    render: text => <span>{text}</span>,
                },
                {
                    title: 'Message',
                    dataIndex: 'message',
                    key: 'message',
                    render: text => <span>{text}</span>,
                },
            ]
        },
        subTabs: []
    });
};

