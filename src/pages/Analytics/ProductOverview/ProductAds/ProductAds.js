import React, {useEffect, useState} from "react"
import './ProductAds.less'
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"
import {analyticsServices} from "../../../../services/analytics.services"
import {useSelector} from "react-redux"

const metrics = [
    // {
    //     title: 'Product Ads',
    //     key: 'product_ads',
    //     type: 'number'
    // },
    {
        title: 'Impression',
        key: 'impressions',
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
        key: 'conversion_rate',
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
            return `${round(+value * 100, 2)}%`
            break

        default:
            return ''

    }
}


const ProductAds = () => {
    const [metricsData, setMetricsData] = useState([])

    const filters = useSelector(state => state.analytics.filters.overview),
        productId = useSelector(state => state.analytics.mainState.productId),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate)

    const getData = async () => {
        try {
            const filtersWithState = [
                ...filters,
                {
                    filterBy: 'productId',
                    type: 'eq',
                    value: productId
                },
                {
                    filterBy: 'datetime',
                    type: 'range',
                    value: selectedRangeDate
                },
            ]

            const res = await analyticsServices.fetchTableData('products', {page: 1, pageSize: 10}, {}, filtersWithState)
            console.log(res)
            if (res.response && res.response[0]) {
                setMetricsData(res.response[0])
            }
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={'product-ads-section'}>
            {/*<h2>Product Ads</h2>*/}

            <div className="metrics-list">
                {metrics.map((item, index) => (
                    <div>
                        <div className={'title'}>
                            {item.title}
                        </div>

                        <div className={'value'}>
                            {/*{index === 0 && `Total: `}*/}

                            {metricsData[item.key] == null ? '-' : renderMetricValue(item.type, metricsData[item.key])}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductAds
