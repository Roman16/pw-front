import React from "react"
import {Input} from "antd"

export const columns = () => ({
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
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
            />
        },
        {
            title: 'Search volume',
            dataIndex: 'value',
            key: 'value',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
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
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
            />
        },
        {
            title: 'Search volume',
            dataIndex: 'value',
            key: 'value',
            render: (url, item, index) => <Input
                value={url}
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
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
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
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
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
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
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
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
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
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
                // onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
            />
        },
    ],
})

