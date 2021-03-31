import React, {useState} from "react"
import {caseImages} from '../../../assets/img/landing-redefineApproach/cases/caseImages'
import {useSwipeEffect} from "../../../utils/hooks/useSwipeEffect"

const casesList = [
    {
        title: `<span>8 days</span> with Zero to Hero`,
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
        const slides = document.querySelectorAll('.slider > ul > li')

        if (index > casesList.length - 1) index = 0
        else if (index < 0) index = casesList.length - 1

        slides.forEach((item, i) => {
            if (i < index) item.style.transform = 'translateX(-150px)'
            else item.style.transform = 'translateX(150px)'
        })

        setTimeout(() => {
            setActiveSlide(index)
        }, 100)
    }

    const goToNextSlide = () => {
        const slides = document.querySelectorAll('.slider > ul > li')

        let index = activeSlide + 1

        if (activeSlide === slides.length - 1) {
            slides[slides.length - 1].style.transform = 'translateX(-150px)'
            slides[0].style.transform = 'translateX(150px)'
        } else {
            slides.forEach((item, i) => {
                if (i < index) item.style.transform = 'translateX(-150px)'
                else item.style.transform = 'translateX(150px)'
            })
        }

        setTimeout(() => {
            setActiveSlide(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
        }, 100)
    }

    const goToPrevSlide = () => {
        const slides = document.querySelectorAll('.slider > ul > li')

        let index = activeSlide - 1

        if (activeSlide === 0) {
            slides[slides.length - 1].style.transform = 'translateX(-150px)'
            slides[0].style.transform = 'translateX(150px)'

        } else {
            slides.forEach((item, i) => {
                if (i <= index) item.style.transform = 'translateX(-150px)'
                else item.style.transform = 'translateX(150px)'
            })
        }

        setTimeout(() => {
            setActiveSlide(prevState => prevState === 0 ? slides.length - 1 : prevState - 1)
        }, 100)
    }

    const [touchStart, swipeHandler] = useSwipeEffect(goToPrevSlide, goToNextSlide)


    return (
        <div className="slider">
            <button className="btn icon prev" onClick={goToPrevSlide}>
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="12">
                        <rect width="16.8" height="12" transform="matrix(-1 0 0 1 17 0)" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask0)">
                        <path
                            d="M5.90078 1.19995L1.40078 5.99995M1.40078 5.99995L5.90078 10.8M1.40078 5.99995L15.8008 5.99995"
                            stroke="#6D6DF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </svg>
            </button>

            <ul onTouchMove={swipeHandler} onTouchStart={touchStart}>
                {casesList.map((slide, index) => <li className={index === activeSlide ? 'active' : ''}>
                    <img src={caseImages[`caseImg${index}`]} alt=""/>

                    <div className="content">
                        <h3 dangerouslySetInnerHTML={{__html: slide.title}}/>

                        <div className="row desc">
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

                        <div className="mob">
                            {slide.beforeColumn.map((metric, index) => (
                                <div>
                                    <h3>{metric.metric}</h3>

                                    <div className="row">
                                        <p>Before: <span>{metric.value}</span></p>
                                        <p>After: <span>{slide.afterColumn[index].value}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </li>)}
            </ul>

            <button className="btn icon next" onClick={goToNextSlide}>
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="12">
                        <rect width="16.8" height="12" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask0)">
                        <path
                            d="M11.0992 1.19995L15.5992 5.99995M15.5992 5.99995L11.0992 10.8M15.5992 5.99995L1.19922 5.99995"
                            stroke="#6D6DF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </svg>
            </button>


            <div className="dots">
                {casesList.map((i, index) => <div
                    className={index === activeSlide ? 'active' : ''}
                    onClick={() => goToSlide(index)}
                />)}
            </div>
        </div>
    )
}

export default CasesSlider