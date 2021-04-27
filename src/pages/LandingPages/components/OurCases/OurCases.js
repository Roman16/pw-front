import React, {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay} from "@fortawesome/free-solid-svg-icons"
import {casesImages} from "../../../../assets/img/landing-automation/cases"
import Slider from "react-slick"
import {history} from "../../../../utils/history"
import './OurCases.less'
import {useSwipeEffect} from "../../../../utils/hooks/useSwipeEffect"
import presentation from "../../../../assets/files/Presentation vol2 .pdf"

const casesList = {
    'ppc': [
        {
            title: 'One year with Profit Whales',
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.case1,
            firstColumn: [
                {
                    metric: 'Total Sales',
                    value: '$1,786,513'
                },
                {
                    metric: 'PPC Sales',
                    value: '$68,407'
                },
                {
                    metric: 'Profit',
                    value: '$469,016'
                },
            ],
            secondColumn: [
                {
                    metric: 'Total Sales',
                    value: '$4,834,354'
                },
                {
                    metric: 'PPC Sales',
                    value: '$1,022,292'
                },
                {
                    metric: 'Profit',
                    value: '$1,097,849'
                },
            ]
        },
        {
            title: '2 months Profit Whales results',
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.case4,
            firstColumn: [
                {
                    metric: 'CPC',
                    value: '2.89'
                },
                {
                    metric: 'ACOS',
                    value: '38.12%'
                },
                {
                    metric: 'PPC Sales',
                    value: '$142,496'
                },
            ],
            secondColumn: [
                {
                    metric: 'CPC',
                    value: '2.11'
                },
                {
                    metric: 'ACOS',
                    value: '24.44%'
                },
                {
                    metric: 'PPC Sales',
                    value: '$361,740'
                },
            ]
        },
        {
            title: 'One year with Profit Whales results',
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.case3,
            firstColumn: [
                {
                    metric: 'Orders',
                    value: '13,997'
                },
                {
                    metric: 'Total Sales',
                    value: '$395,667'
                },
                {
                    metric: 'PPC Sales',
                    value: '$255,110'
                },
            ],
            secondColumn: [
                {
                    metric: 'Orders',
                    value: '47,884'
                },
                {
                    metric: 'Total Sales',
                    value: '$1,434,221'
                },
                {
                    metric: 'PPC Sales',
                    value: '$872,692'
                },
            ]
        },
        {
            title: '3 months Profit Whales results',
            firstColumnTitle: '12 months without Profit Whales',
            secondColumnTitle: '3 months with Profit Whales',
            img: casesImages.case5_1,
            firstColumn: [
                {
                    metric: 'ACOS',
                    value: '55,31%'
                },
                {
                    metric: 'PPC orders',
                    value: '2,771'
                },
                {
                    metric: 'PPC Sales',
                    value: '$54,228'
                },
            ],
            secondColumn: [
                {
                    metric: 'ACOS',
                    value: '26,6%'
                },
                {
                    metric: 'PPC orders',
                    value: '11,192'
                },
                {
                    metric: 'PPC Sales',
                    value: '$197,993'
                },
            ]
        },
        {
            title: 'One year with Profit Whales results',
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.case2,
            firstColumn: [
                {
                    metric: 'Orders',
                    value: '113,620'
                },
                {
                    metric: 'Total Sales',
                    value: '$3,044,884'
                },
                {
                    metric: 'PPC Sales',
                    value: '$1,378,785'
                },
            ],
            secondColumn: [
                {
                    metric: 'Orders',
                    value: '239,643'
                },
                {
                    metric: 'Total Sales',
                    value: '$6,761,369'
                },
                {
                    metric: 'PPC Sales',
                    value: '$3,814,759'
                },
            ]
        },
        {
            title: '3 months Profit Whales results',
            firstColumnTitle: 'For 12 months',
            secondColumnTitle: 'For 3 months',
            img: casesImages.case5_2,
            firstColumn: [
                {
                    metric: 'ACOS',
                    value: '55,31%'
                },
                {
                    metric: 'PPC orders',
                    value: '2,771'
                },
                {
                    metric: 'PPC Sales',
                    value: '$54,228'
                },
            ],
            secondColumn: [
                {
                    metric: 'ACOS',
                    value: '26,6%'
                },
                {
                    metric: 'PPC orders',
                    value: '11,192'
                },
                {
                    metric: 'PPC Sales',
                    value: '$197,993'
                },
            ]
        },
    ],

    'zth': [
        {
            title: `<span>8 days</span> with Zero to Hero`,
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.zthCase1,
            firstColumn: [
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
            secondColumn: [
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
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.zthCase2,
            firstColumn: [
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
            secondColumn: [
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
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.zthCase3,
            firstColumn: [
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
            secondColumn: [
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
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.zthCase4,
            firstColumn: [
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
            secondColumn: [
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
            title: `<span>30 days</span> with Zero to Hero`,
            firstColumnTitle: 'Before',
            secondColumnTitle: 'After',
            img: casesImages.zthCase5,
            firstColumn: [
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
            secondColumn: [
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
}

let swipeTimeoutId = null

const OurCases = ({product, title = 'Our Cases'}) => {
    const [currentCaseSlide, setCaseSlide] = useState(0),
        [selectedImage, selectImage] = useState(null)

    const ourCases = casesList[product]

    const prevSlide = () => {
        clearTimeout(swipeTimeoutId)
        swipeTimeoutId = setTimeout(() => {
            if (currentCaseSlide === 0) {
                setCaseSlide(4)
            } else if (currentCaseSlide === 5) {
                setCaseSlide(2)
            } else {
                setCaseSlide(currentCaseSlide - 1)
            }
        }, 10)
    }

    const nextSlide = () => {
        clearTimeout(swipeTimeoutId)
        swipeTimeoutId = setTimeout(() => {

            if (currentCaseSlide === 4) {
                setCaseSlide(0)
            } else if (currentCaseSlide === 5) {
                setCaseSlide(4)
            } else {
                setCaseSlide(currentCaseSlide + 1)
            }
        }, 10)
    }

    const [touchStart, swipeHandler] = useSwipeEffect(prevSlide, nextSlide)


    const goToSlide = (slide) => {
        setCaseSlide(slide)
    }

    function goToRegistrationPage() {
        history.push('/registration')
    }


    return (
        <>
            <section className='our-cases'>
                <div className="container">
                    <h2 dangerouslySetInnerHTML={{__html: title}}/>

                    <div className='slider' id='cases-slider' onTouchMove={swipeHandler} onTouchStart={touchStart}>
                        <div className="row">
                            <div className="prev" onClick={prevSlide}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle r="20" transform="matrix(-1 0 0 1 20 20)"/>
                                    <mask id="mask046" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="14"
                                          width="17" height="12">
                                        <rect width="16.8" height="12" transform="matrix(-1 0 0 1 28 14)"
                                              fill="#C4C4C4"/>
                                    </mask>
                                    <g mask="url(#mask046)">
                                        <path
                                            d="M16.9008 15.2002L12.4008 20.0002M12.4008 20.0002L16.9008 24.8002M12.4008 20.0002L26.8008 20.0002"
                                            stroke="#6D6DF6" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                    </g>
                                </svg>
                            </div>

                            <div className="image-block">
                                {ourCases.map((item, index) => (
                                    <img
                                        src={item.img}
                                        onClick={() => selectImage(item.img)}
                                        alt=""
                                        style={{display: currentCaseSlide === index ? 'block' : 'none'}}
                                    />
                                ))}

                                {product === 'ppc' && (currentCaseSlide === 3 || currentCaseSlide === 5) &&
                                <div className='change-chart'
                                     onClick={() => currentCaseSlide === 3 ? setCaseSlide(5) : setCaseSlide(3)}>
                                    Change chart
                                </div>
                                }
                            </div>

                            <div className="next" onClick={nextSlide}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="20" />

                                    <mask id="mask037" mask-type="alpha" maskUnits="userSpaceOnUse" x="12" y="14"
                                          width="17" height="12">
                                        <rect x="12" y="14" width="16.8" height="12" fill="#C4C4C4"/>
                                    </mask>
                                    <g mask="url(#mask037)">
                                        <path
                                            d="M23.0992 15.2002L27.5992 20.0002M27.5992 20.0002L23.0992 24.8002M27.5992 20.0002L13.1992 20.0002"
                                            stroke="#6D6DF6" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className='navigation'>
                            {[0, 1, 2].map((item, index) => (
                                <div
                                    onClick={() => goToSlide(index, 'case')}
                                    className={currentCaseSlide === index ? 'active-dot' : ''}
                                />
                            ))}

                            <div
                                onClick={() => goToSlide(3, 'case')}
                                className={currentCaseSlide === 3 || currentCaseSlide === 5 ? 'active-dot' : ''}
                            />

                            <div
                                onClick={() => goToSlide(4, 'case')}
                                className={currentCaseSlide === 4 ? 'active-dot' : ''}
                            />
                        </div>
                    </div>

                    <div className="content">
                        <h3 dangerouslySetInnerHTML={{__html: ourCases[currentCaseSlide].title}}/>

                        <div className="row">
                            <div className="col">
                                <h4>{ourCases[currentCaseSlide].firstColumnTitle}</h4>

                                {ourCases[currentCaseSlide].firstColumn.map(item => (
                                    <div key={item.value}>
                                        <span className='metric-name'>{item.metric}:</span>
                                        <span className='metric-value'>{item.value}</span>
                                    </div>
                                ))}

                            </div>

                            <div className='line'/>

                            <div className="col">
                                <h4>{ourCases[currentCaseSlide].secondColumnTitle}</h4>

                                {ourCases[currentCaseSlide].secondColumn.map(item => (
                                    <div key={item.value}>
                                        <span className='metric-name'>{item.metric}:</span>
                                        <span className='metric-value'>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className='btn default' onClick={goToRegistrationPage}>
                            Get Started
                        </button>
                    </div>

                    <a href={presentation} download className={'btn white'}>
                        download the presentation
                    </a>
                </div>
            </section>

            {selectedImage && <div className="modal-image">
                <span className="close" onClick={() => selectImage(null)}>&times;</span>

                <img src={selectedImage} alt=""/>
            </div>}
        </>
    )
}

export default OurCases