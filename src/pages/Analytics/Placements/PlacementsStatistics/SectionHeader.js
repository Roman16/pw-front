import React, {Fragment} from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Popover, Select} from "antd"
import {SVG} from "../../../../utils/icons"
import {metricKeys} from "../../components/MainMetrics/metricsList"
import {chartAreaKeys} from "./Chart"

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
    {
        title: 'Sales Share',
        key: metricKeys.sales_share,
    },
    {
        title: 'Budget Allocation',
        key: metricKeys.budget_allocation,
    },
]

const LegendMenu = () => {
    return (
        <ul className='chart-legend'>
            {Object.values(chartAreaKeys).map(item => <li>{item}</li>)}
        </ul>
    )
}


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

        <Popover
            content={<LegendMenu/>}
            placement="bottomLeft"
            trigger="click"
            overlayClassName={'overlay-legend-popover'}
            getPopupContainer={(node) => node.parentNode}
        >
            <button className={'legend-button'}>
                <SVG id={'legend-icon'}/>
                legend
            </button>
        </Popover>

    </div>)
}

export default SectionHeader
