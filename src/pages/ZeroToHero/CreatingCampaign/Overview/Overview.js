import React from "react"
import './Overview.less'

const params = [
    {
        title: 'ZTH Type',
        key: '',
        render: () => 'Sponsored Products'
    },
    {
        title: 'Seed Keywords',
        key: '',
        render: () => <div>30 keywords. <a href="">Show</a></div>
    },
    {
        title: 'Campaign Name',
        key: 'name',
        render: () => 'Campaign Name'
    },
    {
        title: 'Portfolio',
        key: 'portfolio',
        render: () => ''
    },
    {
        title: 'Start Date',
        key: 'start_date',
        render: () => ''
    },
    {
        title: 'End Date',
        key: 'end_date',
        render: () => ''
    },
    {
        title: 'Daily Budget',
        key: 'budget',
        render: () => ''
    },
    {
        title: 'Default Bid',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Your Brand Name',
        key: 'brand_name',
        render: () => ''
    },
    {
        title: 'Competitors Brands Names',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Use existing PPC keywords / PTs for ZTH campaigns',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Pause existing keywords / PTs that are duplicates of ZTH targetings',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Campaign bidding strategy',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Bids adjustment by placement: Top of Search (first page)',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Bids adjustment by placement: Product pages (competitors pages)',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Relevant Keywords',
        key: 'bid',
        render: () => ''
    },
    {
        title: 'Negative Keywords',
        key: 'bid',
        render: () => ''
    },

]

const Overview = ({product}) => {

    return (<section className="step overview">
        <div className="container">
            <h2>Overview</h2>

            <ul>
                {params.map(item => <li>
                    <div className="title">
                        {item.title}
                    </div>

                    <div className="value">
                        {item.render ? item.render(item) : product[item.key]}
                    </div>
                </li>)}
            </ul>
        </div>
    </section>)
}

export default Overview