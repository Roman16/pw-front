import {actionField, reasonField} from "./const";

export const allReports = () => {
    return ([
        {
            title: 'Object',
            dataIndex: 'object',
            key: 'object',
            minWidth: '14.285714285714286rem',
            filter: true
        },
        {
            title: 'Object Type',
            dataIndex: 'object_type',
            key: 'object_type',
            minWidth: '14.285714285714286rem',
            filter: true
        },
        {
          ...actionField
        },
        {
           ...reasonField
        },
    ])
};

