import React, {useState} from "react"
import {casesImages} from "../../../assets/img/landing-automation/cases"

const casesList = [
    {
        title: `<span>8 days</span> with Zero to Hero`,
        img: casesImages.zthCase1,
        beforeColumn: [
            {
                metric: 'Clicks',
                value: '2,086'
            },
            {
                metric: 'PPC Orders',
                value: '580'
            },
            {
                metric: 'CPC',
                value: '$1,57'
            },
        ],
        afterColumn: [
            {
                metric: 'Clicks',
                value: '22,845'
            },
            {
                metric: 'PPC Orders',
                value: '5,897'
            },
            {
                metric: 'CPC',
                value: '$1,12'
            },
        ]
    },
    {
        title: `<span>40 days</span> with Zero to Hero`,
        img: casesImages.zthCase2,
        beforeColumn: [
            {
                metric: 'Total Sales',
                value: '$66,313'
            },
            {
                metric: 'Organic Sales',
                value: '$16,822'
            },
            {
                metric: 'PPC Sales',
                value: '$49,431'
            },
        ],
        afterColumn: [
            {
                metric: 'Total Sales',
                value: '$471,686'
            },
            {
                metric: 'Organic Sales',
                value: '$126,078'
            },
            {
                metric: 'PPC Sales',
                value: '$345,608'
            },
        ]
    },
    {
        title: `<span>20 days</span> with Zero to Hero`,
        img: casesImages.zthCase3,
        beforeColumn: [
            {
                metric: 'Organic Sales',
                value: '$132,204'
            },
            {
                metric: 'PPC Sales',
                value: '$21,535'
            },
            {
                metric: 'Profit',
                value: '$55,392'
            },
        ],
        afterColumn: [
            {
                metric: 'Organic Sales',
                value: '$198,453'
            },
            {
                metric: 'PPC Sales',
                value: '$95,570'
            },
            {
                metric: 'Profit',
                value: '$112,361'
            },
        ]
    },
    {
        title: `<span>16 days</span> with Zero to Hero`,
        img: casesImages.zthCase4,
        beforeColumn: [
            {
                metric: 'Organic Sales',
                value: '$232,204'
            },
            {
                metric: 'PPC Sales',
                value: '$11,416'
            },
            {
                metric: 'Profit',
                value: '$48,384'
            },
        ],
        afterColumn: [
            {
                metric: 'Organic Sales',
                value: '$312,453'
            },
            {
                metric: 'PPC Sales',
                value: '$66,996'
            },
            {
                metric: 'Profit',
                value: '$80,585'
            },
        ]
    },
    {
        title: `<span>30  days</span> with Zero to Hero`,
        img: casesImages.zthCase5,
        beforeColumn: [
            {
                metric: 'PPC Sales',
                value: '$26,374'
            },
            {
                metric: 'ACoS',
                value: '30,10%'
            },
            {
                metric: 'CPA',
                value: '$11,1'
            },
        ],
        afterColumn: [
            {
                metric: 'PPC Sales',
                value: '$324,961'
            },
            {
                metric: 'ACoS',
                value: '9,30%'
            },
            {
                metric: 'CPA',
                value: '$3,2'
            },
        ]
    },
]


const CasesSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    const goToSlide = (index) => {
        setActiveSlide(index)
    }

    return (
        <div className="slider">

            <ul>
                {casesList.map(slide => <li>
                    <img src="" alt=""/>

                    <div className="content">
                        <h3>{slide.title}</h3>

                        <div className="row">
                            <div className="col">
                                <h4>Before</h4>

                                {slide.beforeColumn.map(item => (
                                    <div key={item.value}>
                                        <span className='metric-name'>{item.metric}:</span>
                                        <span className='metric-value'>{item.value}</span>
                                    </div>
                                ))}

                            </div>

                            <div className='line'/>

                            <div className="col">
                                <h4>After</h4>

                                {slide.afterColumn.map(item => (
                                    <div key={item.value}>
                                        <span className='metric-name'>{item.metric}:</span>
                                        <span className='metric-value'>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </li>)}
            </ul>

            <div className="dots">
                {casesList.map((i, index) => <div onClick={() => goToSlide(index)}/>)}
            </div>
        </div>
    )
}

export default CasesSlider