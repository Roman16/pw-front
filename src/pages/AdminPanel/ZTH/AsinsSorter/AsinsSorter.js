import React, {useEffect, useRef, useState} from "react"
import TextArea from "antd/es/input/TextArea"
import './AsinsSorter.less'
import {SVG} from "../../../../utils/icons"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import _ from 'lodash'

const {Option, OptGroup} = Select

const marketplaces = [
    {
        label: 'Amazon.com (United States)',
        domain: 'com',
        key: 'US',
        group: 'na'
    },
    {
        label: 'Amazon.ca (Canada)',
        domain: 'ca',
        key: 'CA',
        group: 'na'
    },
    {
        label: 'Amazon.com.mx (Mexico)',
        domain: 'com.mx',
        key: 'MX',
        group: 'na'
    },
    {
        label: 'Amazon.com.br (Brazil)',
        domain: 'com.br',
        key: 'BR',
        group: 'na'
    },
    {
        label: 'Amazon.de (Germany)',
        domain: 'de',
        key: 'DE',
        group: 'eu'
    },
    {
        label: 'Amazon.co.uk (United Kingdom)',
        domain: 'co.uk',
        key: 'GB',
        group: 'eu'
    },
    {
        label: 'Amazon.fr (France)',
        domain: 'fr',
        key: 'FR',
        group: 'eu'
    },
    {
        label: 'Amazon.it (Italy)',
        domain: 'it',
        key: 'IT',
        group: 'eu'
    },
    {
        label: 'Amazon.es (Spain)',
        domain: 'es',
        key: 'ES',
        group: 'eu'
    },
    {
        label: 'Amazon.nl (Netherlands)',
        domain: 'nl',
        key: 'NL',
        group: 'eu'
    },
]

const AsinsSorter = () => {
    const paramsFromLocale = localStorage.getItem('asinsFiltering') ? JSON.parse(localStorage.getItem('asinsFiltering')) : undefined

    const [fieldValue, setFieldValue] = useState(paramsFromLocale ? paramsFromLocale.inputFields : ''),
        [allAsins, setAllAsins] = useState(paramsFromLocale ? paramsFromLocale.allAsins : []),
        [negativeAsins, setNegativeAsins] = useState(paramsFromLocale ? paramsFromLocale.negativeAsins : []),
        [marketplace, setMarketplace] = useState(marketplaces[0].key)

    const negativeBlockRef = useRef(null)

    const asinImageUrl = asin => `https://ws-${_.find(marketplaces, {key: marketplace}).group}.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=${marketplace}&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL150`

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
        window.open(`https://www.amazon.${_.find(marketplaces, {key: marketplace}).domain}/dp/${asin}`)
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
                            <OptGroup label={'Americas'}>
                                {marketplaces.filter(i => i.group === 'na').map(item => <Option
                                    value={item.key}>{item.label}</Option>)}
                            </OptGroup>

                            <OptGroup label={'Europe'}>
                                {marketplaces.filter(i => i.group === 'eu').map(item => <Option
                                    value={item.key}>{item.label}</Option>)}
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