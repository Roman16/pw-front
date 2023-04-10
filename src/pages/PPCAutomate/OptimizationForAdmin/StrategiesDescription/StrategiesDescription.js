import React from "react"
import {SVG} from "../../../../utils/icons"
import {Drawer, Progress} from "antd"
import './StrategiesDescription.less'

const strategies = [
    {
        label: 'ACoS Targeting',
        value: 'AcosTargeting',
        fill: 'FF5256',
        sales: 3,
        acos: 1,
        description: 'This strategy designed for sellers who know what ACoS they are targeting. Make sure you\'ve correctly calculated your Target ACoS.\n' +
            'Press start and see how the algorithm is making changes to get the results you want.',
        spendRevenue: 9,
        profitRevenue: 18,
        averageAcos: 36,
        averageClicks: 250
    },
    {
        label: 'Product Launch',
        value: 'ProductLaunch',
        fill: '9464B9',
        sales: 3,
        acos: 5,
        description: 'Strategy designed for sellers who wants to launch or relaunch the product. The algorithm will be more aggressive with the bids, so you will get your first sales, reviews, and increase your brand awareness.',
        spendRevenue: 18,
        profitRevenue: '<5',
        averageAcos: 62,
        averageClicks: 250
    },
    {
        label: 'Organic Sales Growth',
        value: 'OrganicSalesGrowth',
        fill: 'BA96F4',
        sales: 5,
        acos: 5,
        description: 'This strategy designed for sellers who want to keep their organic ranking positions with PPC efforts. So they can make more profit from Organic Sales. It will achieve your break-even ACoS to keep higher sales from ads that will lead to growing your organic sales.',
        spendRevenue: 12,
        profitRevenue: 26,
        averageAcos: 32,
        averageClicks: 240
    },
    {
        label: 'Revenue Growth',
        value: 'RevenueGrowth',
        fill: 'EB93D2',
        sales: 5,
        acos: 5,
        description: 'This strategy designed for sellers who want to boost their overall sales, so to rank for more keywords. It requires increasing your advertising budget and keeping the ACoS higher than your break-even ACoS.',
        spendRevenue: 18,
        profitRevenue: 14,
        averageAcos: 38,
        averageClicks: 390
    },
    {
        label: 'Profitable PPC',
        value: 'ProfitablePPC',
        fill: 'FFA8AA',
        sales: 4,
        acos: 2,
        description: 'This strategy designed for sellers who want to increase their PPC profit. The Software will optimize all the bleeding and unprofitable keywords with proper bid management to get the best converting ad position possible.',
        spendRevenue: 7,
        profitRevenue: 22,
        averageAcos: 24,
        averageClicks: 100
    }
]

const icons = {
    'AcosTargeting': `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_20871:64733" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
<circle cx="28" cy="28" r="28" fill="#FFAF52"/>
</mask>
<g mask="url(#mask0_20871:64733)">
<path d="M31.8438 43.4602V45.8735C38.9607 44.5237 44.5234 38.961 45.8732 31.844H43.46C42.192 37.6521 37.6519 42.1923 31.8438 43.4602Z" fill="#FF5256" fill-opacity="0.3"/>
<path d="M43.46 25.2995H45.8732C44.5234 18.1825 38.9607 12.6198 31.8438 11.27V13.6833C37.6519 14.9512 42.192 19.4914 43.46 25.2995Z" fill="#FF5256" fill-opacity="0.3"/>
<path d="M25.299 13.6833V11.27C18.182 12.6198 12.6193 18.1825 11.2695 25.2995H13.6828C14.9507 19.4914 19.4909 14.9512 25.299 13.6833Z" fill="#FF5256" fill-opacity="0.3"/>
<path d="M13.6828 31.844H11.2695C12.6193 38.961 18.182 44.5237 25.299 45.8735V43.4602C19.4909 42.1923 14.9507 37.6521 13.6828 31.844Z" fill="#FF5256" fill-opacity="0.3"/>
<path d="M46.8136 27.385H41.2509C40.7191 21.2905 35.8518 16.4232 29.7573 15.8915V10.3287C29.7573 9.67431 29.2256 9.14258 28.5711 9.14258C27.9167 9.14258 27.385 9.67431 27.385 10.3287V15.8915C21.2905 16.4232 16.4232 21.2905 15.8915 27.385H10.3287C9.67431 27.385 9.14258 27.9167 9.14258 28.5711C9.14258 29.2256 9.67431 29.7573 10.3287 29.7573H15.8915C16.4232 35.8518 21.2905 40.7191 27.385 41.2509V46.8136C27.385 47.468 27.9167 47.9997 28.5711 47.9997C29.2256 47.9997 29.7573 47.468 29.7573 46.8136V41.2509C35.8518 40.7191 40.7191 35.8518 41.2509 29.7573H46.8136C47.468 29.7573 47.9997 29.2256 47.9997 28.5711C47.9997 27.9167 47.468 27.385 46.8136 27.385ZM33.8884 27.794L31.8433 29.5119C31.7206 29.6346 31.6388 29.7982 31.6797 29.9618L32.3342 32.5796C32.4978 33.3158 31.7206 33.8884 31.0662 33.4794L28.7757 32.0478C28.6121 31.966 28.4484 31.966 28.2848 32.0478L26.0352 33.4794C25.3808 33.8884 24.6036 33.3158 24.7672 32.5796L25.4217 29.9618C25.4626 29.7982 25.4217 29.6346 25.2581 29.5119L23.2539 27.7531C22.6812 27.2623 22.9675 26.3215 23.7447 26.2806L26.4442 26.0761C26.6078 26.0761 26.7715 25.9534 26.8124 25.7898L27.8349 23.2948C28.1212 22.5994 29.1029 22.5994 29.3892 23.2948L30.4118 25.7898C30.4936 25.9534 30.6163 26.0352 30.7799 26.0761L33.4794 26.2806C34.1748 26.3624 34.4611 27.3032 33.8884 27.794Z" fill="#FF5256"/>
</g>
</svg>`,
    'ProductLaunch': `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.256 8.55339C29.2544 8.55225 29.2531 8.55087 29.2519 8.5493C29.0448 8.4191 28.8053 8.34939 28.5607 8.34802C28.316 8.34665 28.0758 8.41369 27.8672 8.54156C26.1804 9.56675 24.3999 12.0526 22.9824 15.363C21.5555 18.7011 20.7337 22.3441 20.7364 25.3646C20.7338 26.3294 20.7989 27.2931 20.9311 28.2487C19.8696 29.2192 19.1192 30.259 18.6942 31.342C17.2231 35.1256 19.4318 38.835 20.447 40.2497C20.5907 40.4513 20.779 40.6169 20.9972 40.7338C21.2154 40.8507 21.4576 40.9156 21.705 40.9236C21.9524 40.9316 22.1983 40.8823 22.4236 40.7797C22.6489 40.6772 22.8474 40.524 23.0038 40.3321L23.0097 40.3262L25.6171 37.08C25.658 37.1136 25.6963 37.1437 25.7309 37.1719C26.1251 37.4909 26.617 37.6648 27.1242 37.6642L29.9818 37.6651C30.4889 37.6664 30.981 37.4928 31.3751 37.1737L31.4834 37.0863L34.088 40.328L34.0939 40.3339C34.2351 40.5076 34.4109 40.65 34.6102 40.7519C34.8095 40.8537 35.0279 40.9129 35.2514 40.9256C35.4748 40.9383 35.6985 40.9042 35.908 40.8255C36.1176 40.7468 36.3084 40.6252 36.4683 40.4686C36.5316 40.4054 36.5896 40.3371 36.6417 40.2643C37.6669 38.846 39.8833 35.147 38.3949 31.3524C37.9722 30.2772 37.225 29.2415 36.1703 28.2678C36.3059 27.3106 36.3728 26.345 36.3705 25.3783C36.3782 22.3437 35.5792 18.7143 34.1767 15.4208C32.7812 12.1423 30.9865 9.63865 29.256 8.55339ZM32.342 21.3826C32.3424 22.1308 32.1209 22.8623 31.7055 23.4845C31.2901 24.1068 30.6994 24.5918 30.0083 24.8783C29.3172 25.1648 28.5566 25.2398 27.8228 25.094C27.089 24.9481 26.4149 24.5879 25.8859 24.0588C25.3568 23.5298 24.9966 22.8558 24.8507 22.1219C24.7049 21.3881 24.7799 20.6275 25.0664 19.9364C25.3529 19.2453 25.838 18.6546 26.4602 18.2392C27.0824 17.8238 27.8139 17.6023 28.5621 17.6027C29.0595 17.5989 29.5527 17.6941 30.0131 17.8827C30.4734 18.0714 30.8916 18.3496 31.2433 18.7014C31.5951 19.0532 31.8734 19.4714 32.062 19.9317C32.2506 20.392 32.3458 20.8852 32.342 21.3826Z" fill="#9464B9"/>
<path d="M30.2051 38.2164C30.0072 38.3706 29.8724 38.5918 29.8261 38.8384C29.7342 39.328 29.6386 39.8167 29.5353 40.3032C29.3265 41.2874 27.9322 41.3202 27.6697 40.3487L27.267 38.8402C27.2304 38.6456 27.1384 38.4656 27.0021 38.3219C26.8658 38.1781 26.691 38.0768 26.4985 38.03C26.306 37.9831 26.1042 37.9928 25.9171 38.0578C25.73 38.1229 25.5656 38.2405 25.4437 38.3966C24.9076 39.0878 24.6168 39.9376 24.6169 40.8123C24.6173 41.1459 24.6178 42.1592 26.2768 44.3634C26.7541 44.9958 27.2636 45.6032 27.8035 46.1831C27.8981 46.2828 28.0118 46.3625 28.1378 46.4175C28.2638 46.4725 28.3995 46.5018 28.5369 46.5035C28.6744 46.5052 28.8108 46.4794 28.9381 46.4276C29.0654 46.3758 29.1811 46.299 29.2782 46.2018L29.2964 46.1836C29.8369 45.6034 30.3472 44.9959 30.8253 44.3634C32.4849 42.1579 32.4849 41.1441 32.4849 40.811C32.4868 39.9341 32.1926 39.0822 31.6499 38.3934C31.4817 38.1784 31.2351 38.039 30.9641 38.0058C30.6932 37.9726 30.4202 38.0484 30.2051 38.2164Z" fill="#9464B9" fill-opacity="0.3"/>
</svg>`,
    'OrganicSalesGrowth': `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0609 8C4.08406 19.3094 10.4872 27.6806 15.0609 30.4525C12.7325 25.7957 13.5363 18.8105 14.2292 15.9C14.5064 19.0877 15.3935 26.1283 16.7239 28.7894C23.3765 21.721 20.8818 12.5737 15.0609 8Z" fill="#BA96F4" fill-opacity="0.3"/>
<path d="M46.4075 30.0366C24.4539 16.7314 17.8567 27.5419 17.3023 34.6103C20.6286 29.2051 28.1129 27.5419 35.5971 30.0366C21.0445 29.2051 15.6392 40.8471 14.3918 42.0945C13.1445 43.3419 13.1445 45.005 13.976 45.4208C14.8076 45.8366 16.4708 45.8366 17.3023 43.7577C17.9676 42.0945 19.5199 39.7384 20.2129 38.7682C25.2023 42.0945 38.9233 42.5103 46.4075 30.0366Z" fill="#BA96F4" stroke="#BA96F4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    'RevenueGrowth': `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.0595 23.059H19.7654C18.8884 23.059 18.3653 22.0816 18.8517 21.3519L26.538 9.82245C26.9726 9.17051 27.9306 9.17051 28.3653 9.82245L36.0515 21.3519C36.538 22.0816 36.0149 23.059 35.1379 23.059H31.8438V45.5688C31.8438 46.1752 31.3522 46.6668 30.7458 46.6668H24.1575C23.5511 46.6668 23.0595 46.1752 23.0595 45.5688V23.059ZM18.1183 30.1962V45.5688C18.1183 46.1752 17.6267 46.6668 17.0203 46.6668H10.432C9.82559 46.6668 9.33398 46.1752 9.33398 45.5688V30.1962C9.33398 29.5898 9.82559 29.0982 10.432 29.0982H17.0203C17.6267 29.0982 18.1183 29.5898 18.1183 30.1962ZM45.5693 36.7845V45.5688C45.5693 46.1752 45.0777 46.6668 44.4713 46.6668H37.883C37.2766 46.6668 36.785 46.1752 36.785 45.5688V36.7845C36.785 36.178 37.2766 35.6864 37.883 35.6864H44.4713C45.0777 35.6864 45.5693 36.178 45.5693 36.7845Z" fill="#EB93D2" fill-opacity="0.3"/>
<path d="M23.0581 23.0585H19.7639C18.8869 23.0585 18.3639 22.0811 18.8503 21.3514L26.5366 9.82197C26.9712 9.17002 27.9292 9.17002 28.3638 9.82197L36.0501 21.3514C36.5366 22.0811 36.0135 23.0585 35.1365 23.0585H31.8424V45.5683C31.8424 46.1747 31.3508 46.6663 30.7443 46.6663H24.1561C23.5497 46.6663 23.0581 46.1747 23.0581 45.5683V23.0585Z" fill="#EB93D2"/>
</svg>`,
    'ProfitablePPC': `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M47.8333 28.5832V45.4998C47.8333 46.1442 47.311 46.6665 46.6667 46.6665H39.6667C39.0223 46.6665 38.5 46.1442 38.5 45.4998V28.5832C38.5 27.9388 39.0223 27.4165 39.6667 27.4165H46.6667C47.311 27.4165 47.8333 27.9388 47.8333 28.5832Z" fill="#FFA8AA" fill-opacity="0.3"/>
<path d="M16.3333 28.5832V45.4998C16.3333 46.1442 15.811 46.6665 15.1667 46.6665H8.16667C7.52234 46.6665 7 46.1442 7 45.4998V28.5832C7 27.9388 7.52234 27.4165 8.16667 27.4165H15.1667C15.811 27.4165 16.3333 27.9388 16.3333 28.5832Z" fill="#FFA8AA" fill-opacity="0.3"/>
<path d="M37.3333 33.8332V45.4999C37.3333 46.1442 36.811 46.6665 36.1667 46.6665H29.1667C28.5223 46.6665 28 46.1442 28 45.4999V33.8332C28 33.1888 28.5223 32.6665 29.1667 32.6665H36.1667C36.811 32.6665 37.3333 33.1888 37.3333 33.8332Z" fill="#FFA8AA" fill-opacity="0.3"/>
<path d="M26.8333 33.8332V45.4999C26.8333 46.1442 26.311 46.6665 25.6667 46.6665H18.6667C18.0223 46.6665 17.5 46.1442 17.5 45.4999V33.8332C17.5 33.1888 18.0223 32.6665 18.6667 32.6665H25.6667C26.311 32.6665 26.8333 33.1888 26.8333 33.8332Z" fill="#FFA8AA" fill-opacity="0.3"/>
<circle cx="27.4167" cy="19.2497" r="9.91667" fill="#FFA8AA"/>
<path d="M31.5007 21.2924C31.5007 18.3034 25.613 18.4986 25.613 16.694C25.613 15.8205 26.5059 15.3939 27.5416 15.3939C29.2832 15.3939 29.5933 16.4412 30.3822 16.4412C30.9408 16.4412 31.2097 16.112 31.2097 15.743C31.2097 14.8855 29.8206 14.2364 28.4886 14.0117V13.1842C28.4886 12.9363 28.3834 12.6985 28.1961 12.5233C28.0088 12.348 27.7548 12.2495 27.49 12.2495C27.2251 12.2495 26.9711 12.348 26.7838 12.5233C26.5966 12.6985 26.4913 12.9363 26.4913 13.1842V14.0409C25.039 14.3502 23.7898 15.293 23.7898 16.83C23.7898 19.7009 29.6766 19.5848 29.6766 21.6014C29.6766 22.2999 28.8686 22.9985 27.5416 22.9985C25.5514 22.9985 24.8883 21.7377 24.0799 21.7377C23.6861 21.7377 23.334 22.0478 23.334 22.5154C23.334 23.2579 24.6639 24.1517 26.4926 24.4014L26.4913 24.4072V25.3411C26.4988 25.5844 26.6074 25.8154 26.7939 25.985C26.9805 26.1546 27.2303 26.2495 27.4904 26.2495C27.7504 26.2495 28.0003 26.1546 28.1868 25.985C28.3734 25.8154 28.4819 25.5844 28.4894 25.3411V24.4072C28.4894 24.3963 28.4836 24.3877 28.4827 24.378C30.1282 24.0905 31.5007 23.0865 31.5007 21.2924Z" fill="white"/>
</svg>`,
}


const StrategiesDescription = ({visible, onClose}) => {

    return (
        <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={413}
            className={'strategies-description-drawer'}
        >
            <div className="header-block" onClick={onClose}>
                <h2>Strategies</h2>

                <i>
                    <SVG id={'select-icon'}/>
                </i>
            </div>

            <ul>
                {strategies.map((item, index) => (
                    <li>
                        <div className="row">
                            <i dangerouslySetInnerHTML={{__html: icons[item.value]}}/>

                            <div className="col">
                                <b>{item.label} <span>{item.value === 'AcosTargeting' ? 'Recommended' : 'Coming soon'}</span></b>

                                <div className="row">
                                    <div className="sales">
                                        Sales

                                        <div className="starts">
                                            {[0, 1, 2, 3, 4].map(star => (
                                                <div style={{
                                                    width: `${4 + star}px`,
                                                    height: `${4 + star}px`,
                                                    background: star <= item.sales ? `#${item.fill}` : '#C9CBD4'
                                                }}
                                                     className={star <= item.sales ? 'active' : ''}/>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="acos">
                                        ACoS
                                        <div className="starts">
                                            {[0, 1, 2, 3, 4].map(star => (
                                                <div style={{
                                                    width: `${4 + star}px`,
                                                    height: `${4 + star}px`,
                                                    background: star <= item.acos ? `#${item.fill}` : '#C9CBD4'
                                                }}
                                                     className={star <= item.acos ? 'active' : ''}/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                            {item.description}
                        </p>

                        {/*<div className="values">*/}
                        {/*    <div>*/}
                        {/*        <Progress*/}
                        {/*            type="circle"*/}
                        {/*            percent={75}*/}
                        {/*            trailColor={`#${item.fill}`}*/}
                        {/*            strokeColor={`#${item.fill}`}*/}
                        {/*            format={() => `${strategies[index].spendRevenue}%`}*/}
                        {/*        />*/}
                        {/*        <label htmlFor="">Spend/ <br/> Revenue</label>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <Progress*/}
                        {/*            type="circle"*/}
                        {/*            percent={75}*/}
                        {/*            trailColor={`#${item.fill}`}*/}
                        {/*            strokeColor={`#${item.fill}`}*/}
                        {/*            format={() => `${strategies[index].profitRevenue}%`}*/}
                        {/*        />*/}
                        {/*        <label htmlFor="">Profit/ <br/> Revenue</label>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <Progress*/}
                        {/*            type="circle"*/}
                        {/*            percent={75}*/}
                        {/*            trailColor={`#${item.fill}`}*/}
                        {/*            strokeColor={`#${item.fill}`}*/}
                        {/*            format={() => `${strategies[index].averageAcos}%`}*/}
                        {/*        />*/}
                        {/*        <label htmlFor="">Average <br/> ACoS</label>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <Progress*/}
                        {/*            type="circle"*/}
                        {/*            percent={75}*/}
                        {/*            trailColor={`#${item.fill}`}*/}
                        {/*            strokeColor={`#${item.fill}`}*/}
                        {/*            format={() => strategies[index].averageClicks}*/}
                        {/*        />*/}
                        {/*        <label htmlFor="">Average Daily <br/> Clicks</label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </li>
                ))}
            </ul>
        </Drawer>
    )
}

export default StrategiesDescription
