import React from "react"
import {Input} from "antd"

export const columns = (onChange) => ({
    mainKeywords: [
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
            render: (text, item, index) => <Input
                value={text}
                onChange={({target: {value}}) => onChange('mainKeywords', 'text', value, index)}
            />
        },
        {
            title: 'Search volume',
            dataIndex: 'searchVolume',
            key: 'searchVolume',
            width: '25%',
            render: (value, item, index) => <Input
                value={value}
                onChange={({target: {value}}) => onChange('mainKeywords', 'searchVolume', value, index)}
            />
        },
    ],
    baseKeywords: [
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
                onChange={({target: {value}}) => onChange('baseKeywords', 'text', value, index)}
            />
        },
        {
            title: 'Search volume',
            dataIndex: 'searchVolume',
            key: 'searchVolume',
            width: '25%',
            render: (url, item, index) => <Input
                value={url}
                onChange={({target: {value}}) => onChange('baseKeywords', 'searchVolume', value, index)}
            />
        },
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
                onChange={({target: {value}}) => onChange('productNegativePhrases', 'text', value, index)}
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
                onChange={({target: {value}}) => onChange('productNegativeExacts', 'text', value, index)}
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
                onChange={({target: {value}}) => onChange('negativeASINs', 'text', value, index)}
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
                onChange={({target: {value}}) => onChange('globalNegativePhrases', 'text', value, index)}
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
                onChange={({target: {value}}) => onChange('globalNegativeExacts', 'text', value, index)}
            />
        },
    ],
})

