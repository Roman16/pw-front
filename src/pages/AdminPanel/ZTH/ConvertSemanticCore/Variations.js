import React, {useEffect, useState} from "react"
import {Checkbox, Input} from 'antd'
import Themes from "./Themes"
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import _ from 'lodash'
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {checkboxColumn, keyColumn, textColumn} from "react-datasheet-grid"


let copiedThemes

const getASINFromListing = (url) => {
    const reg = new RegExp('^(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(dp|gp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?$')
    const result = reg.exec(url)
    if (result && result[7]) {
        const asin = result[7] ?? ''
        return asin.trim().toUpperCase()
    } else {
        return ''
    }
}

const Variations = ({semanticData, onChange}) => {
    const [variations, setVariations] = useState([]),
        [activeVariationIndex, setActiveVariationIndex] = useState(0)

    const columns = [
        {...keyColumn('listingUrl', textColumn), title: 'URL', width: 5},
        {...keyColumn('sku', textColumn), title: 'SKU', width: 2},
        {...keyColumn('useForProductAds', checkboxColumn), title: 'Use for Ads', width: 1},
        {...keyColumn('useForDefenseCampaignProductAds', checkboxColumn), title: 'Use for Ads in Defense Campaign', width: 2},
    ]

    const add = () => {
        setVariations([...variations, {
            sku: '',
            listingUrlsSKUs: [],
            useForProductAds: true,
            useForDefenseCampaignProductAds: true,
            themeValues: [{theme: '', value: '', relatedValues: []}]
        }])
    }

    const removeVariationHandler = (e, index) => {
        e.stopPropagation()

        if (index === activeVariationIndex) setActiveVariationIndex(0)
        setVariations([...variations.filter((item, i) => i !== index)])
    }

    const changeVariationHandler = (data) => {
        setVariations(variations.map((variation, index) => {
            if (index === activeVariationIndex) {
                variation.listingUrlsSKUs = data
            }

            return variation
        }))
    }

    const setVariationThemes = (themes) => {
        setVariations(variations.map((variation, index) => {
            if (index === activeVariationIndex) {
                variation.themeValues = themes
            }

            return variation
        }))
    }

    const pasteThemesHandler = () => {
        setVariations(variations.map((variation, index) => {
            if (index === activeVariationIndex && copiedThemes) {
                variation.themeValues = [...copiedThemes.map(item => ({...item, ...item.relatedValues && {relatedValues: [...item.relatedValues]}}))]
            }

            return variation
        }))
    }

    useEffect(() => {
        const variations = [...semanticData.conversionOptions.productInformation.variations]
        const map = []

        variations.forEach(x => {
            let elem = map.find(y => _.isEqual(x.themeValues, y.themeValues))

            if (!elem) {
                elem = {
                    themeValues: x.themeValues,
                    listingUrlsSKUs: []
                }

                map.push(elem)
            }

            elem.listingUrlsSKUs.push({
                listingUrl: x.listingUrl,
                sku: x.sku,
                useForProductAds: x.useForProductAds,
                useForDefenseCampaignProductAds: x.useForDefenseCampaignProductAds
            })
        })

        setVariations(map)
    }, [])

    useEffect(() => {
        onChange({
            ...semanticData,
            conversionOptions: {
                ...semanticData.conversionOptions,
                productInformation: {
                    ...semanticData.conversionOptions.productInformation,
                    variations: variations
                        .reduce((result, variation) => result.concat(variation.listingUrlsSKUs.map(item => ({
                            listingUrl: item.listingUrl,
                            sku: item.sku,
                            useForProductAds: item.useForProductAds,
                            useForDefenseCampaignProductAds: item.useForDefenseCampaignProductAds,
                            themeValues: variation.themeValues
                        }))), [])
                        .filter(variation => variation.sku || variation.listingUrl)
                        .map(variation => {
                            variation.themeValues = variation.themeValues.filter(theme => theme.theme && theme.value)
                            return variation
                        })
                }
            }
        })
    }, [variations])

    return (
        <div className="variations">
            <h2>Variations</h2>
            <button className={'btn default'} onClick={add}>Add new variation</button>
            <br/>

            <ul className="variations-list list-tabs">
                {variations.map((variation, index) => (<li
                    onClick={() => setActiveVariationIndex(index)}
                    className={index === activeVariationIndex && 'active'}
                >

                    <VariationName
                        variation={variation}
                    />

                    <button onClick={(e) => removeVariationHandler(e, index)}>
                        <SVG id={'close-icon'}/>
                    </button>
                </li>))}
            </ul>

            <div className="actions row">
                <button className="btn default"
                        onClick={() => copiedThemes = variations[activeVariationIndex].themeValues}>
                    Copy themes
                </button>

                <button className="btn default" onClick={pasteThemesHandler}>
                    Paste themes
                </button>
            </div>
            <br/>

            <h4>Products:</h4>
            <ExcelTable
                data={variations[activeVariationIndex] ? variations[activeVariationIndex].listingUrlsSKUs.length > 0 ? variations[activeVariationIndex].listingUrlsSKUs : [{
                    useForProductAds: true,
                    useForDefenseCampaignProductAds: true
                }] : [{
                    useForProductAds: true,
                    useForDefenseCampaignProductAds: true
                }]}
                columns={columns}
                createRow={() => ({
                    useForProductAds: true,
                    useForDefenseCampaignProductAds: true
                })}
                onChange={changeVariationHandler}
            />

            <br/>

            <Themes
                themes={variations[activeVariationIndex] && variations[activeVariationIndex].themeValues}
                variationIndex={activeVariationIndex}
                setThemes={(value) => setVariationThemes(value)}
            />

        </div>
    )
}

const VariationName = ({variation}) => {
    const getListingUrls = () => {
        return variation.listingUrlsSKUs.map(x => x.listingUrl).filter(x => x && x.length > 0)
    }

    const getSKUs = () => {
        return variation.listingUrlsSKUs.map(x => x.sku).filter(x => x && x.length > 0)
    }

    const getThemeValues = () => {
        return variation.themeValues.map(x => x.value).filter(x => x && x.length > 0)
    }

    const urls = getListingUrls()
    const skus = getSKUs()

    if (urls.length > 0) {
        if (urls.length === 1) {
            const asin = getASINFromListing(urls[0])
            if (!asin) {
                return `Wrong listing url`
            } else {
                return `'${asin}' ASIN: ${getThemeValues().join(', ')}`.trim()
            }
        } else {
            return `${urls.length} ASINs: ${getThemeValues().join(', ')}`.trim()
        }
    } else if (skus.length > 0) {
        if (skus.length === 1) {
            return `'${skus[0]}' SKU: ${getThemeValues().join(', ')}`.trim()
        } else {
            return `${skus.length} SKUs: ${getThemeValues().join(', ')}`.trim()
        }
    } else {
        return 'Empty Variation'
    }
}


export default React.memo(Variations)
