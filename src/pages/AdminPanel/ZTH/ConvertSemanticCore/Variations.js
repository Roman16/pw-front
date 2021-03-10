import React, {useEffect, useState} from "react"
import {Checkbox, Input} from 'antd'
import Themes from "./Themes"
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"

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
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'URL',
            dataIndex: 'listingUrl',
            key: 'listingUrl',
            render: (url, item, index) => <Input
                value={url}
                onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
            />
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            width: '300px',
            render: (sku, item, index) => <Input
                value={sku}
                onChange={({target: {value}}) => changeVariationHandler('sku', value, index)}
            />
        },
        {
            title: 'Use for Product Ads',
            dataIndex: 'useForProductAds',
            key: 'useForProductAds',
            width: '300px',
            render: (checked, item) => <Checkbox
                checked={!!checked}
                onChange={({target: {checked}}) => changeVariationHandler('useForProductAds', checked)}
            />
        },
    ]

    const add = () => {
        setVariations([...variations, {
            sku: '',
            listingUrlsSKUs: [],
            useForProductAds: true,
            themeValues: [{theme: '', value: '', relatedValues: []}]
        }])
    }

    const removeVariationHandler = (e, index) => {
        e.stopPropagation()

        if (index === activeVariationIndex) setActiveVariationIndex(0)
        setVariations([...variations.filter((item, i) => i !== index)])
    }

    const changeVariationHandler = (name, value, indexChangedRow) => {
        setVariations(variations.map((variation, index) => {
            if (index === activeVariationIndex) {
                variation.listingUrlsSKUs[indexChangedRow] = {
                    ...variation.listingUrlsSKUs[indexChangedRow],
                    [name]: value
                }
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
        setVariations(semanticData.conversionOptions.productInformation.variations.map(item => ({
            ...item,
            listingUrlsSKUs: [{
                listingUrl: item.listingUrl,
                sku: item.sku
            }]
        })))
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

            <h4>Listing URLs and SKUs:</h4>

            <CustomTable
                columns={columns}
                dataSource={[...variations[activeVariationIndex] ? variations[activeVariationIndex].listingUrlsSKUs : [], {}]}
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
