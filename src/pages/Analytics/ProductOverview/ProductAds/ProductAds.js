import React from "react"
import './ProductAds.less'
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"

const metrics = [
    {
        title: 'Impression',
        key: 'impression',
        type: 'number'
    },
    {
        title: 'Clicks',
        key: 'clicks',
        type: 'number'
    },
    {
        title: 'CTR',
        key: 'ctr',
        type: 'percent'
    },
    {
        title: 'Cost',
        key: 'cost',
        type: 'currency'
    },
    {
        title: 'CPC',
        key: 'cpc',
        type: 'currency'
    },
    {
        title: 'Conversion',
        key: 'conversion',
        type: 'number'
    },
    {
        title: 'Sales Revenue',
        key: 'sales_revenue',
        type: 'currency'
    },
    {
        title: 'ACoS',
        key: 'acos',
        type: 'percent'
    },
    {
        title: 'Conversion Rate',
        key: 'conversion_rate',
        type: 'percent'
    },
    {
        title: 'CPA',
        key: 'cpa',
        type: 'currency'
    },
]


const renderMetricValue = (type, value) => {
    switch (type) {
        case 'number':
            return numberMask(value, 0)
            break

        case 'currency':
            return `$${numberMask(value, 2)}`
            break

        case 'percent':
            return `${round(value, 2)}%`
            break

        default:
            return ''

    }
}


const ProductAds = () => {

    return (
        <section className={'product-ads-section'}>
            <h2>Product Ads</h2>

            <div className="metrics-list">
                {metrics.map(item => (
                    <div>
                        <label htmlFor="">{item.title}</label>

                        <p>{renderMetricValue(item.type, 244)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductAds