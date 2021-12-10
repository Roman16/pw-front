import React from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import {metricKeys} from "../../components/MainMetrics/metricsList"

const Option = Select.Option

const availableMetrics = [
    {
        title: 'Impressions',
        key: metricKeys.impressions
    },
    {
        title: 'Clicks',
        key: metricKeys.clicks
    },
    {
        title: 'Ad Spend',
        key: metricKeys.cost
    },
    {
        title: 'Ad Sales',
        key: metricKeys.ad_sales,
    },
    {
        title: 'Ad Orders',
        key: metricKeys.ad_orders,
    },
    {
        title: 'Ad Units',
        key: metricKeys.ad_units,
    },
    // {
    //     title: 'Sales Share',
    //     key: metricKeys.sales_share,
    // },
    // {
    //     title: 'Budget Allocation',
    //     key: metricKeys.budget_allocation,
    // },
]




const SectionHeader = ({selectedMetric, onChange}) => {
    return (<div className="section-header">
        <CustomSelect
            getPopupContainer={(node) => node.parentNode}
            value={selectedMetric}
            onChange={value => onChange(value)}
        >
            {availableMetrics.map(metric => (
                <Option value={metric.key}>{metric.title}</Option>
            ))}
        </CustomSelect>
    </div>)
}

export default SectionHeader
