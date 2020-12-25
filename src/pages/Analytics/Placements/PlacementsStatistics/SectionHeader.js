import React, {Fragment} from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Popover, Select} from "antd"
import {SVG} from "../../../../utils/icons"

const Option = Select.Option

const availableMetrics = [
    {
        title: 'Impressions',
        key: 'impressions'
    },
    {
        title: 'Clicks',
        key: 'clicks'
    },
    {
        title: 'Ad Spend',
        key: 'cost'
    },
    {
        title: 'Ad Sales',
        key: 'attributedSales30d',
    },
    {
        title: 'Ad Orders',
        key: 'attributedConversions30d',
    },
    {
        title: 'Ad Units',
        key: 'attributedUnitsOrdered30d',
    },
    {
        title: 'Sales Share',
        key: 'sales_share',
    },
    {
        title: 'Budget Allocation',
        key: 'budget_allocation',
    },
]

const LegendMenu = () => {
    return (
        <ul className='chart-legend'>
            <li>Top of Search</li>
            <li>Product Pages</li>
            <li>Rest of Search</li>
            <li>Other</li>
        </ul>
    )
}


const SectionHeader = () => {
    return (<div className="section-header">
        <CustomSelect
            getPopupContainer={(node) => node.parentNode}
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
