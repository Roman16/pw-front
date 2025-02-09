import React, {useEffect, useState} from "react"
import {Checkbox, Input} from 'antd'
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import _ from 'lodash'
import Themes from "../ConvertSemanticCore/Themes"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {keyColumn, textColumn, checkboxColumn} from "react-datasheet-grid"


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
        // {
        //     title: '',
        //     dataIndex: 'index',
        //     key: 'index',
        //     width: '50px',
        //     render: (i, item, index) => index + 1
        // },
        // {
        //     title: 'URL',
        //     dataIndex: 'listingUrl',
        //     key: 'listingUrl',
        //     render: (url, item, index) => <Input
        //         value={url}
        //         onChange={({target: {value}}) => changeVariationHandler('listingUrl', value, index)}
        //     />
        // },
        // {
        //     title: 'SKU',
        //     dataIndex: 'sku',
        //     key: 'sku',
        //     width: '220px',
        //     render: (sku, item, index) => <Input
        //         value={sku}
        //         onChange={({target: {value}}) => changeVariationHandler('sku', value, index)}
        //     />
        // },
        // {
        //     title: 'Use for Ads',
        //     dataIndex: 'useForProductAds',
        //     key: 'useForProductAds',
        //     width: '120px',
        //     render: (checked, item, index) => {
        //         return (<Checkbox
        //             checked={checked}
        //             onChange={({target: {checked}}) => changeVariationHandler('useForProductAds', checked, index)}
        //         />)
        //     }
        // },
        // {
        //     title: 'Use for Ads in Defense Campaign',
        //     dataIndex: 'useForDefenseCampaignProductAds',
        //     key: 'useForDefenseCampaignProductAds',
        //     width: '240px',
        //     render: (checked, item, index) => {
        //         return (<Checkbox
        //             checked={checked}
        //             onChange={({target: {checked}}) => changeVariationHandler('useForDefenseCampaignProductAds', checked, index)}
        //         />)
        //     }
        // },
        // {
        //     title: 'Use for Suggested ASINs',
        //     dataIndex: 'useForSubCategoryASINsSearch',
        //     key: 'useForSubCategoryASINsSearch',
        //     width: '180px',
        //     render: (checked, item, index) => {
        //         return (<Checkbox
        //             checked={checked}
        //             onChange={({target: {checked}}) => changeVariationHandler('useForSubCategoryASINsSearch', checked, index)}
        //         />)
        //     }
        // },

        {...keyColumn('listingUrl', textColumn), title: 'URL', width: 5},
        {...keyColumn('sku', textColumn), title: 'SKU', width: 2},
        {...keyColumn('useForProductAds', checkboxColumn), title: 'Use for Ads', width: 1},
        {
            ...keyColumn('useForDefenseCampaignProductAds', checkboxColumn),
            title: 'Use for Ads in Defense Campaign',
            width: 2
        },
        {...keyColumn('useForSubCategoryASINsSearch', checkboxColumn), title: 'Use for Suggested ASINs', width: 2},

    ]

    const add = () => {
        setVariations([...variations, {
            sku: '',
            listingUrlsSKUs: [],
            useForSubCategoryASINsSearch: true,
            useForDefenseCampaignProductAds: true,
            useForProductAds: true,
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
        const variations = [...semanticData.productInformation.variations]
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
                useForSubCategoryASINsSearch: x.useForSubCategoryASINsSearch,
                useForDefenseCampaignProductAds: x.useForDefenseCampaignProductAds,
                useForProductAds: x.useForProductAds,
            })
        })

        setVariations([...map, {
            sku: '',
            listingUrlsSKUs: [],
            useForSubCategoryASINsSearch: true,
            useForDefenseCampaignProductAds: true,
            useForProductAds: true,
            themeValues: [{theme: '', value: '', relatedValues: []}]
        }])
    }, [])

    useEffect(() => {
        onChange({
            ...semanticData,
            productInformation: {
                ...semanticData.productInformation,
                variations: variations
                    .reduce((result, variation) => result.concat(variation.listingUrlsSKUs.map(item => ({
                        listingUrl: item.listingUrl,
                        sku: item.sku,
                        useForSubCategoryASINsSearch: item.useForSubCategoryASINsSearch,
                        useForDefenseCampaignProductAds: item.useForDefenseCampaignProductAds,
                        useForProductAds: item.useForProductAds,
                        themeValues: variation.themeValues
                    }))), [])
                    .filter(variation => variation.sku || variation.listingUrl)
                    .map(variation => {
                        variation.themeValues = variation.themeValues.filter(theme => theme.theme && theme.value)
                        return variation
                    })
            }
        })
    }, [variations])

    return (
        <div className="variations">
            <h2>Variations</h2>
            <button className={'btn default'} onClick={add}>Add new variation</button>
            <br/>

            {variations.length > 0 && <>
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
                        useForSubCategoryASINsSearch: true,
                        useForDefenseCampaignProductAds: true,
                        useForProductAds: true
                    }] : [{
                        useForSubCategoryASINsSearch: true,
                        useForDefenseCampaignProductAds: true,
                        useForProductAds: true
                    }]}
                    columns={columns}
                    createRow={() => ({
                        useForSubCategoryASINsSearch: true,
                        useForDefenseCampaignProductAds: true,
                        useForProductAds: true
                    })}
                    onChange={changeVariationHandler}
                />

                <br/>

                <Themes
                    themes={variations[activeVariationIndex] && variations[activeVariationIndex].themeValues}
                    variationIndex={activeVariationIndex}
                    setThemes={(value) => setVariationThemes(value)}
                />
            </>}
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
