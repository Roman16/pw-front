import React, {useEffect, useRef, useState} from "react"
import TextArea from "antd/es/input/TextArea"
import './AsinsSorter.less'
import {SVG} from "../../../../utils/icons"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"

const {Option, OptGroup} = Select

const AsinsSorter = () => {
    const paramsFromLocale = localStorage.getItem('asinsFiltering') ? JSON.parse(localStorage.getItem('asinsFiltering')) : undefined

    const [fieldValue, setFieldValue] = useState(paramsFromLocale ? paramsFromLocale.inputFields : ''),
        [allAsins, setAllAsins] = useState(paramsFromLocale ? paramsFromLocale.allAsins : []),
        [negativeAsins, setNegativeAsins] = useState(paramsFromLocale ? paramsFromLocale.negativeAsins : []),
        [marketplace, setMarketplace] = useState('US')

    const negativeBlockRef = useRef(null)

    const asinImageUrl = asin => `https://ws-${(marketplace === 'US' || marketplace === 'CA' || marketplace === 'MX' || marketplace === 'BR') ? 'na' : 'eu'}.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=${marketplace}&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL150`

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
        window.open(`https://www.amazon.${marketplace}/dp/${asin}`)
    }

    const copyAsins = (type) => {
        const copy = (asins) => {
            navigator.clipboard.writeText(asins.map(i => `asin="${i}"`).join('\n'))
        }

        if (type === 'all') copy(allAsins)
        else if (type === 'positive') copy(allAsins.filter(i => !negativeAsins.includes(i)))
        else if (type === 'negative') copy(negativeAsins)
    }

    useEffect(() => {
        localStorage.setItem('asinsFiltering', JSON.stringify({
            inputFields: fieldValue,
            allAsins: allAsins,
            negativeAsins: negativeAsins
        }))
    }, [fieldValue, allAsins, negativeAsins])

    return (
        <section className={'asins-sorter'}>
            <div className="row">
                <div className="actions">
                    <div className="form-group">
                        <label htmlFor="">Marketplace:</label>
                        <CustomSelect
                            value={marketplace}
                            onChange={value => setMarketplace(value)}
                        >
                            <OptGroup label="Americas">
                                <Option value="US">Amazon.com (United States)</Option>
                                <Option value="CA">Amazon.ca (Canada)</Option>
                                <Option value="MX">Amazon.com.mx (Mexico)</Option>
                                <Option value="BR">Amazon.com.br (Brazil)</Option>
                            </OptGroup>
                            <OptGroup label="Europe">
                                <Option value="DE">Amazon.de (Germany)</Option>
                                <Option value="GB">Amazon.co.uk (United Kingdom)</Option>
                                <Option value="FR">Amazon.fr (France)</Option>
                                <Option value="IT">Amazon.it (Italy)</Option>
                                <Option value="ES">Amazon.es (Spain)</Option>
                                <Option value="NL">Amazon.nl (Netherlands)</Option>
                            </OptGroup>
                        </CustomSelect>
                    </div>

                    <button className="btn default" onClick={resetAllHandler}>
                        Reset All
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col enter-asins">
                    <div className="actions">
                        <h3>Input</h3>
                        <button className="btn default" onClick={addAsinsHandler}
                                disabled={fieldValue.trim().length === 0}>
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
                        <h3>
                            All ASINs
                        </h3>

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
                        <h3>
                            Negative ASINs
                        </h3>

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
            </div>
        </section>
    )
}

export default AsinsSorter