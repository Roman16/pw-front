import React, {useEffect, useState} from "react"
import {Input} from 'antd'
import Themes from "./Themes"
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"


let newTabIndex = 0

const TextArea = Input.TextArea

let copiedThemes

const Variations = ({semanticData, onChange}) => {
    const [variations, setVariations] = useState(semanticData.conversionOptions.productInformation.variations || []),
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
            render: (url) => <TextArea
                autoSize
                value={url}
                onChange={({target: {value}}) => changeVariationHandler('listingUrl', value)}
            />
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            width: '300px',
            render: (sku) => <TextArea
                autoSize
                value={sku}
                onChange={({target: {value}}) => changeVariationHandler('sku', value)}
            />
        },
    ]

    const add = () => {
        newTabIndex++
        setVariations([...variations, {
            sku: '',
            themeValues: [{name: '', value: '', relatedValues: []}]
        }])
    }

    const removeVariationHandler = (e, index) => {
        e.stopPropagation()

        if (index === activeVariationIndex) setActiveVariationIndex(0)
        setVariations([...variations.filter((item, i) => i !== index)])
    }

    const changeVariationHandler = (name, value) => {
        setVariations(variations.map((variation, index) => {
            if (index === activeVariationIndex) {
                variation[name] = value
            }

            return variation
        }))
    }

    const pasteThemesHandler = () => {
        setVariations(variations.map((variation, index) => {
            if (index === activeVariationIndex && copiedThemes) {
                variation.themeValues = copiedThemes
            }

            return variation
        }))
    }

    useEffect(() => {
        onChange({
            ...semanticData,
            conversionOptions: {
                ...semanticData.conversionOptions,
                productInformation: {
                    ...semanticData.conversionOptions.productInformation,
                    variations: variations
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
                    {variation.listingUrl ? `'${variation.asin}' ASIN${variation.themeValues.map(theme => theme.value).filter(item => !!item).length > 0 && ':'} ${variation.themeValues.map(theme => theme.value).filter(item => !!item).join(', ')}` : 'Empty Variation'}

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
                dataSource={[{
                    listingUrl: variations[activeVariationIndex].listingUrl,
                    sku: variations[activeVariationIndex].sku
                }]}
            />

            <br/>

            <Themes
                themes={variations[activeVariationIndex] && variations[activeVariationIndex].themeValues}
                setThemes={(value) => changeVariationHandler('themeValues', value)}
            />

        </div>
    )
}

export default React.memo(Variations)
