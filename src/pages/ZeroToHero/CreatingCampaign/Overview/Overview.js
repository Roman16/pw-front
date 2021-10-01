import React from "react"
import './Overview.less'
import moment from 'moment'

const params = [
    {
        title: 'ZTH Type',
        render: () => 'Sponsored Products'
    },
    {
        title: 'Seed Keywords',
        render: () => <div>30 keywords. <a href="">Show</a></div>
    },
    {
        title: 'Campaign Name',
        render: (product) => product.name || '-'
    },
    {
        title: 'Portfolio',
        render: () => ''
    },
    {
        title: 'Start Date',
        render: (product) => product.start_date ? moment(product.start_date).format('MMM DD, YYYY') : '-'
    },
    {
        title: 'End Date',
        render: (product) => product.end_date ? moment(product.end_date).format('MMM DD, YYYY') : '-'
    },
    {
        title: 'Daily Budget',
        render: (product) => product.budget ? `$${product.budget}` : '-'
    },
    {
        title: 'Default Bid',
        render: (product) => product.bid ? `$${product.bid}` : '-'
    },
    {
        title: 'Your Brand Name',
        render: (product) => product.brand_name || '-'
    },
    {
        title: 'Competitors Brands Names',
        render: () => ''
    },
    {
        title: 'Use existing PPC keywords / PTs for ZTH campaigns',
        render: () => ''
    },
    {
        title: 'Pause existing keywords / PTs that are duplicates of ZTH targetings',
        render: () => ''
    },
    {
        title: 'Campaign bidding strategy',
        render: () => ''
    },
    {
        title: 'Bids adjustment by placement: Top of Search (first page)',
        render: () => ''
    },
    {
        title: 'Bids adjustment by placement: Product pages (competitors pages)',
        render: () => ''
    },
    {
        title: 'Relevant Keywords',
        render: () => ''
    },
    {
        title: 'Negative Keywords',
        render: () => ''
    },

]

const Overview = ({product}) => {
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