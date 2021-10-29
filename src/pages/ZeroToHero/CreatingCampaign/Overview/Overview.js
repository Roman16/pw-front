import React, {useState} from "react"
import './Overview.less'
import moment from 'moment'
import {numberMask} from "../../../../utils/numberMask"
import {round} from "../../../../utils/round"


const Overview = ({product}) => {
    const [visibleKeywords, setVisibleKeywords] = useState([])

    const openKeywordsHandler = (type) => {
        if (visibleKeywords.includes(type)) setVisibleKeywords(visibleKeywords.filter(i => i !== type))
        else setVisibleKeywords([...visibleKeywords, type])
    }

    const params = [
        {
            title: 'ZTH Type',
            render: () => 'Sponsored Products'
        },
        {
            title: 'Seed Keywords',
            render: (product) => {
                const key = 'main_keywords'

                return (<div className="keywords">
                    <p>{product.campaigns[key].filter(i => !i.isDuplicate).length} keywords.
                        <div
                            onClick={() => openKeywordsHandler(key)}
                        >
                            {visibleKeywords.includes(key) ? 'Hide' : 'Show'}
                        </div>
                    </p>

                    {visibleKeywords.includes(key) && <div className="list">
                        {product.campaigns[key].filter(i => !i.isDuplicate).map(i => i.value).join(', ')}
                    </div>}
                </div>)
            }
        },
        {
            title: 'Portfolio',
            render: (product) => {
                if (product.portfolio.type === "UseExisting") {
                    return product.portfolio.selectName
                } else if (product.portfolio.type === 'CreateNew') {
                    return `New Portoflio: ${product.portfolio.name}, ${numberMask(product.portfolio.monthly_recurring_budget, 2)}$ monthly budget`
                } else {
                    return 'No portfolio'
                }
            }
        },
        {
            title: 'Start Date',
            render: (product) => product.campaigns.start_date ? moment(product.campaigns.start_date).format('MMM DD, YYYY') : '-'
        },
        {
            title: 'End Date',
            render: (product) => product.campaigns.end_date ? moment(product.campaigns.end_date).format('MMM DD, YYYY') : '-'
        },
        {
            title: 'Set campaigns Status to Paused on upload to Amazon',
            render: (product) => product.campaigns.set_to_paused ? 'Yes' : 'No'
        },
        {
            title: 'Daily Budget',
            render: (product) => product.campaigns.daily_budget ? `${numberMask(product.campaigns.daily_budget, 2)}$` : '-'
        },
        {
            title: 'Default Bid',
            render: (product) => product.campaigns.default_bid ? `${numberMask(product.campaigns.default_bid, 2)}$` : '-'
        },
        {
            title: 'Your Brand Name',
            render: (product) => product.brand.name || '-'
        },
        {
            title: 'Competitors Brands Names',
            render: (product) => {
                const key = 'competitor_brand_names'

                return (<div className="keywords">
                    <p>{product.brand[key].length} Competitors Brands Names.
                       {product.brand[key].length > 0 && <div
                            onClick={() => openKeywordsHandler(key)}
                        >
                            {visibleKeywords.includes(key) ? 'Hide' : 'Show'}
                        </div>}
                    </p>

                    {visibleKeywords.includes(key) && <div className="list">
                        {product.brand[key].join(', ')}
                    </div>}
                </div>)
            }
        },
        {
            title: 'Use existing PPC keywords / PTs for ZTH campaigns',
            render: (product) => product.use_existing_ppc_targetings ? 'Yes' : 'No'
        },
        {
            title: 'Pause existing keywords / PTs that are duplicates of ZTH targetings',
            render: (product) => product.pause_existing_duplicates_of_zth_targetings ? 'Yes' : 'No'
        },
        {
            title: 'Campaign bidding strategy',
            render: (product) => {
                if (product.campaigns.bidding_strategy === 'legacyForSales') return 'Dynamic bids - down only'
                if (product.campaigns.bidding_strategy === 'autoForSales') return 'Dynamic bids - up and down'
                if (product.campaigns.bidding_strategy === 'manual') return 'Fixed bids'
            }
        },
        {
            title: 'Bids adjustment by placement: Top of Search (first page)',
            render: (product) => {
                if (product.campaigns.adjust_bid_by_placements.top_of_search) return `${round(product.campaigns.adjust_bid_by_placements.top_of_search, 2)}%`
                else return '-'
            }
        },
        {
            title: 'Bids adjustment by placement: Product pages (competitors pages)',
            render: (product) => {
                if (product.campaigns.adjust_bid_by_placements.product_pages) return `${round(product.campaigns.adjust_bid_by_placements.product_pages, 2)}%`
                else return '-'
            }
        },
        {
            title: 'Relevant Keywords',
            render: (product) => `${product.relevant_keywords.length} keywords`
        },
        {
            title: 'Negative Keywords',
            render: (product) => `${product.negative_keywords.filter(i => i.type === 'exact').length} negative exacts, ${product.negative_keywords.filter(i => i.type === 'phrase').length} negative phrases`
        },

    ]


    return (<section className="step overview">
        <div className="bg-container">
            <div className="container">
                <h2>Overview</h2>

                <ul>
                    {params.map(item => <li>
                        <div className="title">
                            {item.title}
                        </div>

                        <div className="value">
                            {item.render(product)}
                        </div>
                    </li>)}
                </ul>
            </div>
        </div>
    </section>)
}

export default Overview