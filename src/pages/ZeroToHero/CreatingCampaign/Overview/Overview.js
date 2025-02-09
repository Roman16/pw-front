import React, {useState} from "react"
import './Overview.less'
import {numberMask} from "../../../../utils/numberMask"
import {NavigationButtons} from "../SelectProduct/SelectProduct"
import {SVG} from "../../../../utils/icons"


const Overview = ({product,createProcessing, onChangeStep, onCreate, onEdit}) => {
    const [visibleKeywords, setVisibleKeywords] = useState([])

    const openKeywordsHandler = (type) => {
        if (visibleKeywords.includes(type)) setVisibleKeywords(visibleKeywords.filter(i => i !== type))
        else setVisibleKeywords([...visibleKeywords, type])
    }

    const params = [
        {
            title: 'ZTH Type',
            key: 'type',
            render: () => 'Sponsored Products'
        },
        {
            title: 'Your Brand Name',
            key: 'name',
            render: (product) => product.brand.name || '-'
        },
        // {
        //     title: 'Competitors Brands Names',
        //     key: 'competitor_brand_names',
        //     render: (product) => {
        //         const key = 'competitor_brand_names'
        //
        //         return (<div className="keywords">
        //             <p>{product.brand[key].length} Competitors Brands Names.
        //                 {product.brand[key].length > 0 && <div
        //                     onClick={() => openKeywordsHandler(key)}
        //                 >
        //                     {visibleKeywords.includes(key) ? 'Hide' : 'Show'}
        //                 </div>}
        //             </p>
        //
        //             {visibleKeywords.includes(key) && <div className="list">
        //                 {product.brand[key].join(', ')}
        //             </div>}
        //         </div>)
        //     }
        // },
        {
            title: 'Seed Keywords',
            key: 'main_keywords',
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
            title: 'Target Campaigns Daily Budget',
            key: 'daily_budget',
            render: (product) => product.campaigns.daily_budget ? `${numberMask(product.campaigns.daily_budget, 2)}$` : '-'
        },
        {
            title: 'Starting Bid',
            key: 'default_bid',
            render: (product) => product.campaigns.default_bid ? `${numberMask(product.campaigns.default_bid, 2)}$` : '-'
        },
        {
            title: 'Enable campaigns after upload',
            key: 'set_to_paused',
            render: (product) => product.campaigns.set_to_paused ? 'No' : 'Yes'
        },
        {
            title: 'Pause existing keywords / PTs that are duplicates of ZTH targetings',
            key: 'pause_existing_duplicates_of_zth_targetings',
            render: (product) => product.pause_existing_duplicates_of_zth_targetings ? 'Yes' : 'No'
        },
        {
            title: 'Relevant Keywords',
            key: 'relevant_keywords',
            render: (product) => `${product.relevant_keywords.length} keywords`
        },
        {
            title: 'Negative Keywords',
            key: 'negative_keywords',
            render: (product) => `${product.negative_keywords.filter(i => i.type === 'exact').length} negative exacts, ${product.negative_keywords.filter(i => i.type === 'phrase').length} negative phrases`
        },


        // {
        //     title: 'Portfolio',
        //     render: (product) => {
        //         if (product.portfolio.type === "UseExisting") {
        //             return product.portfolio.selectName
        //         } else if (product.portfolio.type === 'CreateNew') {
        //             return `New Portoflio: ${product.portfolio.name}, ${numberMask(product.portfolio.monthly_recurring_budget, 2)}$ monthly budget`
        //         } else {
        //             return 'No portfolio'
        //         }
        //     }
        // },
        // {
        //     title: 'Start Date',
        //     render: (product) => product.campaigns.start_date ? moment(product.campaigns.start_date).format('MMM DD, YYYY') : '-'
        // },
        // {
        //     title: 'End Date',
        //     render: (product) => product.campaigns.end_date ? moment(product.campaigns.end_date).format('MMM DD, YYYY') : '-'
        // },
        // {
        //     title: 'Use existing PPC keywords / PTs for ZTH campaigns',
        //     render: (product) => product.use_existing_ppc_targetings ? 'Yes' : 'No'
        // },
        // {
        //     title: 'Campaign bidding strategy',
        //     render: (product) => {
        //         if (product.campaigns.bidding_strategy === 'legacyForSales') return 'Dynamic bids - down only'
        //         if (product.campaigns.bidding_strategy === 'autoForSales') return 'Dynamic bids - up and down'
        //         if (product.campaigns.bidding_strategy === 'manual') return 'Fixed bids'
        //     }
        // },
        // {
        //     title: 'Bids adjustment by placement: Top of Search (first page)',
        //     render: (product) => {
        //         if (product.campaigns.adjust_bid_by_placements.top_of_search) return `${round(product.campaigns.adjust_bid_by_placements.top_of_search, 2)}%`
        //         else return '-'
        //     }
        // },
        // {
        //     title: 'Bids adjustment by placement: Product pages (competitors pages)',
        //     render: (product) => {
        //         if (product.campaigns.adjust_bid_by_placements.product_pages) return `${round(product.campaigns.adjust_bid_by_placements.product_pages, 2)}%`
        //         else return '-'
        //     }
        // },
    ]

    return (<section className={`step step-5 overview`}>
        <div className="bg-container">
            <div className="container">
                <div className="section-header">
                    <div className="step-count">Step 6/6</div>
                    <h2>Overview</h2>
                    <p>
                        Please review information you provided. If everything is ok, press "Generate campaigns" button. <br/>
                        Software will perform keyword and product research, generate Semantic Core and campaigns structure for you. <br/>
                        When everything is ready, you will be able to review the result and proceed to the payment. After the payment, campaigns structure will be automatically uploaded to your Amazon Account.
                    </p>
                </div>

                <ul>
                    {params.map(item => <li>
                        <div className="title">
                            {item.title}
                        </div>

                        <div className="value">
                            {item.render(product)}
                        </div>

                        {item.key !== 'type' && <button className={'btn icon'} onClick={() => onEdit(item.key)}>
                            <SVG id={'edit-pen-icon'}/>
                        </button>}
                    </li>)}
                </ul>

                <NavigationButtons
                    onPrevStep={() => onChangeStep(4)}
                    onNextStep={onCreate}
                    nextBtnText={'GENERATE CAMPAIGNS'}
                    nextBtnArrow={false}
                    nextBtnProcessing={createProcessing}
                />
            </div>

            <div className="progress-bar">
                <div/>
            </div>
        </div>
    </section>)
}

export default Overview