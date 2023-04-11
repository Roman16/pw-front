import React, {useEffect, useState} from "react"
import './CampaignsConfiguration.less'
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import {Checkbox, Drawer, Input} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import TreeSelect from "../../../../components/TreeSelect/TreeSelect"
import _ from "lodash"

const {Search} = Input

let requestSent = false


export const multiSelectVariations = [
    {title: 'Bid Optimization Keywords', key: 'bid_optimization_keywords', value: 'bid_optimization_keywords'},
    {title: 'Bid Optimization PAT', key: 'bid_optimization_pats', value: 'bid_optimization_pats'},
    {title: 'Activate Keywords', key: 'activate_keywords', value: 'activate_keywords'},
    {title: 'Activate PATs', key: 'activate_pats', value: 'activate_pats'},
    {title: 'Pause Bleeding Keywords', key: 'pause_bleeding_keywords', value: 'pause_bleeding_keywords'},
    {title: 'Pause Bleeding PATs', key: 'pause_bleeding_pats', value: 'pause_bleeding_pats'},
    {title: 'Remove Duplicates', key: 'remove_duplicates', value: 'remove_duplicates'},
]


const CampaignsConfiguration = ({optimizationJobId, productInformation, isDisabled, getSettings, loading, jobsList, onUpdate}) => {
    const [sectionHeightState, setSectionHeightState] = useState(false),
        [hasJob, setJobState] = useState(false),
        [visibleDrawer, setVisibleDrawer] = useState(false),
        [searchText, setSearchText] = useState()


    useEffect(() => {
        if (isDisabled) {
            setSectionHeightState(false)
        }
    }, [isDisabled])

    const changeSettingsHandler = (id, name, value, label) => {

        onUpdate(jobsList.map((item, listIndex) => {
            if (item.campaign_id === id) {
                if (name === 'dont_optimize' || name === 'dont_use_metrics') {
                    item[name] = !value
                } else {
                    item[name] = value
                }

                if (name === 'dont_optimize' && value) {
                    item['dont_use_metrics'] = false
                }
            }

            return item
        }))
    }

    const resetSettingsHandler = (field) => {
        onUpdate(jobsList.map((i) => {
            return ({
                ...i,
                ...(field === 'all' || field === 'dont_optimize') && {dont_optimize: false},
                ...(field === 'all' || field === 'dont_use_metrics') && {dont_use_metrics: false},
                ...(field === 'all' || field === 'min_bid') && {min_bid: null},
                ...(field === 'all' || field === 'max_bid') && {max_bid: null},
                ...(field === 'all' || field === 'optimization_parts') && {
                    optimization_parts: multiSelectVariations.map(item => item.value),
                    enable_optimization_parts: false
                },
            })
        }))
    }

    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'campaignName',
            key: 'campaignName',
            minWidth: '200px',
        },
        {
            title: () => <div className={'with-reset'}>Optimize <button className="btn icon"
                                                                        onClick={() => resetSettingsHandler('dont_optimize')}>
                <SVG id='reload-icon'/>
            </button></div>,
            dataIndex: 'dont_optimize',
            key: 'dont_optimize',
            width: '160px',
            render: (dont_optimize, item, index) => {
                return (
                    <Checkbox
                        checked={!dont_optimize}
                        onChange={(e) => changeSettingsHandler(item.campaign_id, 'dont_optimize', e.target.checked)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Use for PPC Metrics <button className="btn icon"
                                                                                   onClick={() => resetSettingsHandler('dont_use_metrics')}>
                <SVG id='reload-icon'/>
            </button></div>,
            dataIndex: 'dont_use_metrics',
            key: 'dont_use_metrics',
            width: '200px',
            render: (dontUseMetrics, item, index) => {
                return (
                    <Checkbox
                        checked={!dontUseMetrics}
                        disabled={!item.dont_optimize}
                        onChange={(e) => changeSettingsHandler(item.campaign_id, 'dont_use_metrics', e.target.checked)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Min Bid
                <button className="btn icon" onClick={() => resetSettingsHandler('min_bid')}>
                    <SVG id='reload-icon'/>
                </button></div>,
            dataIndex: 'min_bid',
            key: 'min_bid',
            width: '130px',
            render: (min_bid, item, index) => {
                return (
                    <InputCurrency
                        disabled={item.dont_optimize}
                        value={min_bid}
                        onChange={(value) => changeSettingsHandler(item.campaign_id, 'min_bid', value)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Max Bid
                <button className="btn icon" onClick={() => resetSettingsHandler('max_bid')}>
                    <SVG id='reload-icon'/>
                </button></div>,
            dataIndex: 'max_bid',
            key: 'max_bid',
            width: '130px',
            render: (max_bid, item, index) => {
                return (
                    <InputCurrency
                        disabled={item.dont_optimize}
                        value={max_bid}
                        onChange={(value) => changeSettingsHandler(item.campaign_id, 'max_bid', value)}
                    />
                )
            }
        },
        {
            title: () => <div className={'with-reset'}>Custom Optimization Parts
                <button className="btn icon" onClick={() => resetSettingsHandler('optimization_parts')}>
                    <SVG id='reload-icon'/>
                </button></div>,
            dataIndex: 'optimization_parts',
            key: 'optimization_parts',
            width: '260px',
            render: (optimization_parts, item, index) => {
                return (
                    <>
                        <Checkbox
                            disabled={item.dont_optimize}
                            checked={item.enable_optimization_parts}
                            onChange={(e) => changeSettingsHandler(item.campaign_id, 'enable_optimization_parts', e.target.checked)}

                        />

                        <TreeSelect
                            treeCheckable={true}
                            showSearch={false}
                            placeholder={'Type'}
                            dropdownClassName={'optimization-parts-dropdown'}
                            disabled={item.dont_optimize || !item.enable_optimization_parts}
                            value={optimization_parts}
                            treeData={multiSelectVariations}
                            onChange={(e, label) => changeSettingsHandler(item.campaign_id, 'optimization_parts', e, label)}
                        />
                    </>
                )
            }
        },
    ]

    const getCampaignsSettings = () => {
        getSettings()
        setJobState(true)
        requestSent = true
    }

    useEffect(() => {
        requestSent = false

        if (!optimizationJobId) {
            onUpdate([])
            setJobState(false)
        }
    }, [optimizationJobId])

    useEffect(() => {
        if (optimizationJobId && sectionHeightState && !requestSent && productInformation.status !== null) {
            getCampaignsSettings()
        }
    }, [sectionHeightState, optimizationJobId])

    return (
        <>
            <section className={`campaigns-configuration ${sectionHeightState ? 'opened' : 'closed'}`}>
                <div className="section-header" onClick={() => setSectionHeightState(prevState => !prevState)}>
                    <h2>Campaigns Configuration</h2>

                    <SVG id={'select-icon'}/>
                </div>

                <div className={`table-block`}>
                    <div className="section-description">
                        This is an <b>Advanced feature</b> for PPC Automation. We strongly suggest <span
                        onClick={() => setVisibleDrawer(true)}>reading the guide</span> to efficiently use it.
                    </div>

                    <div className={'block-header'}>
                        <div className="form-group">
                            <Search
                                className="search-field"
                                placeholder={`Search by campaign name`}
                                onPressEnter={e => setSearchText(e.target.value)}
                                onBlur={e => setSearchText(e.target.value)}
                                data-intercom-target='search-field'
                                suffix={<SVG id={'search'}/>}
                            />
                        </div>

                        <button className="btn default" onClick={() => resetSettingsHandler('all')}>
                            Reset All
                        </button>
                    </div>

                    <CustomTable
                        loading={loading}
                        dataSource={_.orderBy(searchText ? _.filter(jobsList, (item) => _.includes(item.campaignName.toLowerCase(), searchText.toLowerCase())) : jobsList, ['campaignName'], ['asc'])}
                        columns={columns}
                        emptyText={!hasJob ? 'Can\'t configure campaigns, start optimization first' : 'No campaigns for optimization, check product ads'}
                    />
                </div>
            </section>

            <Drawer
                placement="right"
                closable={false}
                onClose={() => setVisibleDrawer(false)}
                visible={visibleDrawer}
                width={413}
                className={'strategies-description-drawer campaign-configuration'}
            >
                <div className="header-block" onClick={() => setVisibleDrawer(false)}>
                    <h2>How to use our Amazon PPC AI Optimization Software?</h2>

                    <i>
                        <SVG id={'select-icon'}/>
                    </i>
                </div>

                <div className="content">
                    <br/>

                    <p>
                        The best way to use our software is to have a proper campaign structure. At Profit Whales, our
                        parent company, we developed the Amazon PPC Structure that brought us 1+ Billion in Amazon
                        Revenue for our clients. We call it Zero to Hero.
                        <br/>
                        This is the best Amazon Advertising structure to manage your ads and squeeze as much profit as
                        possible.
                    </p>

                    <p>
                        You can learn more about Zero to Hero Structure in this article:
                        <a href="https://help.sponsoreds.com/en/articles/4472761-sponsored-productscampaigns-structure">help.sponsoreds.com</a>
                    </p>

                    <br/>

                    <p>
                        <b>By understanding how Zero to Hero works, you can set up perfect
                            <br/>
                            Automation for each campaign with our AI machine.</b>
                    </p>

                    <p><b>To optimize a chosen product, you must first calculate your break-even or target ACOS.</b></p>

                    <p>
                        To calculate the Amazon break-even ACOS (Advertising Cost of Sales), you need to follow these
                        steps:
                        <br/>
                        <br/>
                        <ul>
                            <li>
                                Determine your product's cost per unit: This includes the cost of manufacturing or
                                sourcing the product, shipping, and other expenses associated with producing the
                                product.
                            </li>
                            <br/>
                            <li>
                                Determine your target profit margin: This is the profit you want on each sale. For
                                example, if your cost per unit is $10, and you want to make a 20% profit margin, your
                                target profit per unit would be $2.
                            </li>
                            <br/>
                            <li>
                                Determine your selling price: This is how you will sell your product on Amazon. Ensure
                                to include any Amazon fees such as referral, fulfillment, and storage fees.
                            </li>
                            <br/>
                            <li>
                                Calculate your break-even ACOS: To do this, use the following formula:
                                <br/>
                                Break-even ACOS = (Target Profit per Unit / Selling Price) x 100%
                            </li>
                        </ul>
                    </p>

                    <br/>

                    <p>
                        For example, let's say your cost per unit is $10, your target profit margin is 20%, and your
                        selling price is $15. Therefore, the target profit per unit would be $2, and the break-even ACOS
                        would be:
                        <br/>
                        Break-even ACOS = ($2 / $15) x 100% = 13.3%
                        <br/>
                        This means that if your ACOS is below 13.3%, you profit from each sale. Conversely, you lose
                        money on each sale if your ACOS exceeds 13.3%.
                    </p>

                    <br/>

                    <p>
                        <b>Once you have figured out this information you can set the target ACOS for the chosen
                            products.</b>
                    </p>

                    <br/>

                    <p>
                        <b>IMPORTANT INFORMATION:</b> algorithms make changes to achieve target ACOS for specific
                        keywords, not for ASIN or entire accounts. Ensure you understand each of the automation settings
                        to achieve desired ACOS.
                    </p>

                    <br/>

                    <p>
                        By changing target ACOS up or down by a few %, you can control the optimization by squeezing
                        more profit or allowing higher CPA to get more advertising sales to influence organic ranking.
                    </p>

                    <br/>

                    <p>
                        Okay, now you understand that our software will get you desired ACOS. So let's talk about how it
                        operates and what kind of settings we are giving you to perform the optimization.
                    </p>

                    <br/>

                    <p>
                        <b>We have nine settings to work with:</b>
                    </p>

                    <p>
                        <b>Bid Optimization Keywords</b> - this part uses AI to find the most profitable bid for your
                        keywords.
                    </p>

                    <p>
                        <b>Bid Optimization PAT</b> - this is the part that uses AI to find the most profitable bid for
                        your ASINs and Categories.
                    </p>

                    <p>
                        <b>Activate Keywords</b> - this algorithm helps you to scale keywords and targets that do not
                        bring enough traffic to scale or pause keywords.
                    </p>

                    <p>
                        <b>Activate PATs</b> - this algorithm helps you to scale keywords and targets that do not bring
                        enough traffic to scale or pause ASINs and Categories
                    </p>

                    <p>
                        <b>Pause Bleeding Keywords</b> - this algorithm identifies unprofitable keywords and eliminates
                        wasted spend to allocate the budget where it can make higher ROAS.
                    </p>

                    <p>
                        <b>Pause Bleeding PATs</b> - this algorithm identifies unprofitable ASINs and Categories and
                        eliminates wasted spend to allocate the budget where it can make higher ROAS.
                    </p>

                    <p>
                        <b>Remove Duplicates</b> - this algorithm finds duplicate search terms and pauses one with worse
                        performance to ensure we are not competing inside our structure.
                    </p>

                    <p>
                        <b>Harvest&Rank New Keywords</b> - this algorithm scan your search term report and find the
                        keywords and targets that are already bringing you profit and scales them further.
                    </p>

                    <p>
                        <b>Add Bed ST to Negatives</b> - this algorithm finds the keywords that are highly unprofitable
                        and irrelevant and negates them to prevent future spend
                    </p>

                    <br/>

                    <p>
                        If you use our Automation algorithm in combination with Zero to Hero campaigns, here are some
                        best practices on how to set up each campaign for better performance:
                    </p>

                    <p>
                        TPK - this is a campaign that consists of keywords that bring us 80% of the profit, so if you
                        are using placement adjustment of 70% + or higher, be careful with bid optimization for this
                        keyword.
                    </p>

                    <p>
                        DPK - this is a campaign where we test the semi-relevant keywords with high search volume. Use
                        all optimization settings for this campaign.
                    </p>

                    <p>
                        Broad Negative - better not to use Bid optimization for this campaign once you found the most
                        profitable bid.
                    </p>

                    <p>
                        Auto Negative - same as "Broad Negative"
                    </p>

                    <p>Exact Simple - use all optimization settings</p>

                    <p>
                        Exact Other - use all optimization settings
                    </p>

                    <p>
                        STE - use all optimization settings
                    </p>

                    <p>
                        TCA/TPA/CA/DA/ASINS - use all optimization settings
                    </p>

                    <p>
                        Categories - same as "Broad Negative"
                    </p>

                    <p>
                        Broad/Exact Variations - use only <b>Pause Bleeding Keywords&PATs and Add Bed ST to Negatives as
                        this will be the most profitable campaign.</b>
                    </p>

                    <p>
                        Own Brand - use only <b>Pause Bleeding Keywords&PATs and Add Bed ST to Negatives as this will be
                        the most profitable campaign.</b>
                    </p>

                    <p>
                        Competing Brands - use all optimization settings
                    </p>

                    <br/>

                    <p>
                        We use this setup inside our agency for dozens of 8&9 figure brands.
                        <br/>
                        Set it up and Enjoy!
                    </p>
                </div>
            </Drawer>
        </>
    )
}

export default CampaignsConfiguration
