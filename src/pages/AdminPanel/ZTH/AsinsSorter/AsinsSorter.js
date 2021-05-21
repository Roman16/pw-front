import React, {useRef, useState} from "react"
import TextArea from "antd/es/input/TextArea"
import './AsinsSorter.less'
import {SVG} from "../../../../utils/icons"

const AsinsSorter = () => {
    const [fieldValue, setFieldValue] = useState(''),
        [allAsins, setAllAsins] = useState([]),
        [negativeAsins, setNegativeAsins] = useState([])

    const negativeBlockRef = useRef(null)

    const asinImageUrl = asin => `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL150`

    const addAsinsHandler = async () => {
        await setAllAsins([...new Set([...allAsins, ...fieldValue
            .split('\n')
            .map(i => i.trim())
            .filter(i => i !== '')
            .map(i => /^asin="(.*)"$/i.test(i) ? i.match(/^asin="(.*)"$/i)[1] : i)
            .map(i => i.toUpperCase())
        ])])

        setFieldValue('')
    }

    const resetAllHandler = () => {
        setAllAsins([])
        setNegativeAsins([])
        setFieldValue('')
    }


    const asinClickHandler = (asin, type = 'positive') => (e) => {
        e.stopPropagation()

        if (e.shiftKey) type === 'negative' ? removeNegativeAsin(asin)(e) : addNegativeAsin(asin)(e)
        else openAsin(asin)(e)
    }

    const addNegativeAsin = (asin) => (e) => {
        e.stopPropagation()
        setNegativeAsins([...new Set([...negativeAsins, asin])])
        setTimeout(() => {
            negativeBlockRef.current.scrollTop = negativeBlockRef.current.scrollHeight
        }, 100)
    }

    const removeNegativeAsin = (asin) => (e) => {
        e.stopPropagation()
        setNegativeAsins([...negativeAsins.filter(i => i !== asin)])
    }

    const openAsin = (asin) => (e) => {
        e.stopPropagation()
        window.open(`https://www.amazon.com/dp/${asin}`)
    }

    const copyAsins = (type) => {
        // allAsins.map(i => `asin="${i}"`).join('\n')
        if (type === 'all') navigator.clipboard.writeText(allAsins.join('\n'))
        else if (type === 'positive') navigator.clipboard.writeText(allAsins.filter(i => !negativeAsins.includes(i)).join('\n'))
        else if (type === 'negative') navigator.clipboard.writeText(negativeAsins.join('\n'))
    }

    return (
        <section className={'asins-sorter'}>
            <div className="col enter-asins">
                <div className="actions">
                    <button className="btn default" onClick={resetAllHandler}>
                        Reset All
                    </button>

                    <button className="btn default" onClick={addAsinsHandler} disabled={fieldValue.trim().length === 0}>
                        add
                    </button>
                </div>

                <div className="form-group">
                    <TextArea
                        value={fieldValue}
                        onChange={({target: {value}}) => setFieldValue(value)}
                    />
                </div>
            </div>

            <div className="col all-asins">
                <div className="actions">
                    <button className="btn default" onClick={() => copyAsins('all')}>
                        Copy All
                    </button>

                    <button className="btn default" onClick={() => copyAsins('positive')}>
                        Copy Positives
                    </button>
                </div>

                <ul>
                    {allAsins.map(asin => {
                        const isDisabled = negativeAsins.includes(asin)

                        return (<li
                            className={`asin ${isDisabled ? 'disabled' : ''}`}
                            onClick={asinClickHandler(asin)}
                        >
                            <div className="image">
                                <img src={asinImageUrl(asin)} alt=""/>
                            </div>

                            <p>
                                <span title={asin}>{asin}</span>
                                <button className="btn icon" data-asin={asin} onClick={openAsin(asin)}>
                                    <SVG id={'outside-link'}/>
                                </button>

                                <button className="btn icon" onClick={addNegativeAsin(asin)}>
                                    <SVG id={'close-window-icon'}/>
                                </button>
                            </p>
                        </li>)
                    })}
                </ul>
            </div>

            <div className="col negative-asins">
                <div className="actions">
                    <button className="btn default" onClick={() => copyAsins('negative')}>
                        Copy
                    </button>
                </div>

                <ul ref={negativeBlockRef}>
                    {negativeAsins.map(asin => <li className={'asin'} onClick={asinClickHandler(asin, 'negative')}>
                        <div className="image">
                            <img src={asinImageUrl(asin)} alt=""/>
                        </div>
                        <p>
                            <span title={asin}>{asin}</span>

                            <button className="btn icon" data-asin={asin} onClick={openAsin(asin)}>
                                <SVG id={'outside-link'}/>
                            </button>

                            <button className="btn icon" onClick={removeNegativeAsin(asin)}>
                                <SVG id={'close-window-icon'}/>
                            </button>
                        </p>
                    </li>)}
                </ul>
            </div>

        </section>
    )
}

export default AsinsSorter