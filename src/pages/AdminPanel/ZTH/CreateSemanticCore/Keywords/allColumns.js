import React from "react"
import {Input} from 'react-spreadsheet-grid'
import {keyColumn, textColumn} from "react-datasheet-grid"

export const columns = {
    mainKeywords: [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 5},
        {...keyColumn('searchVolume', textColumn), title: 'Search volume', width: 2},
        //     onChange={({target: {value}}) => onChange('mainKeywords', 'text', value)}

    ],
    baseKeywords: [
        // {
        //     title: '',
        //     dataIndex: 'index',
        //     key: 'index',
        //     width: '50px',
        //     render: (i, item, index) => index + 1
        // },
        // {
        //     title: 'Keyword text',
        //     dataIndex: 'text',
        //     dataKey: 'text',
        //     key: 'text',
        //     render: (url, item, index) => <Input
        //         value={url}
        //         onChange={({target: {value}}) => onChange('baseKeywords', 'text', value, index)}
        //     />
        // },
        // {
        //     title: 'Search volume',
        //     dataIndex: 'searchVolume',
        //     dataKey: 'searchVolume',
        //     key: 'searchVolume',
        //     width: '25%',
        //     render: (url, item, index) => <Input
        //         value={url}
        //         onChange={({target: {value}}) => onChange('baseKeywords', 'searchVolume', value, index)}
        //     />
        // },

        {...keyColumn('text', textColumn), title: 'Keyword text', width: 5},
        {...keyColumn('searchVolume', textColumn), title: 'Search volume', width: 2},
    ],
    negativePhrases: [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'Keyword text',
            dataIndex: 'text',
            key: 'text',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => onChange('productNegativePhrases', 'text', value, index)}
            />
        },
    ],
    negativeExacts: [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'Keyword text',
            dataIndex: 'text',
            key: 'text',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => onChange('productNegativeExacts', 'text', value, index)}
            />
        },
    ],
    negativeAsins: [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'ASIN',
            dataIndex: 'text',
            key: 'text',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => onChange('negativeASINs', 'text', value, index)}
            />
        },
    ],
    globalNegativePhrases: [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'Keyword text',
            dataIndex: 'text',
            key: 'text',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => onChange('globalNegativePhrases', 'text', value, index)}
            />
        },
    ],
    globalNegativeExacts: [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'Keyword text',
            dataIndex: 'text',
            key: 'text',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => onChange('globalNegativeExacts', 'text', value, index)}
            />
        },
    ],
}

