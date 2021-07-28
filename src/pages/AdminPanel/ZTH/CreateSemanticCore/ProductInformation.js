import React from "react"
import {Checkbox, Input} from "antd"

const ProductInformation = ({semanticData, onChange}) => {

    const changeDataHandler = (obg, name, value) => {
        onChange({
            ...semanticData,
            [obg]: {
                ...semanticData[obg],
                [name]: value
            }
        })
    }

    return (
        <div className={'product-information col'}>
            <h2>Product information:</h2>

            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Product name:</label>
                    <Input
                        type="text"
                        value={semanticData.productInformation.productName}
                        onChange={({target: {value}}) => changeDataHandler('productInformation', 'productName', value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Brand:</label>
                    <Input
                        type="text"
                        value={semanticData.productInformation.brand}
                        onChange={({target: {value}}) => changeDataHandler('productInformation', 'brand', value)}
                    />
                </div>
            </div>

            <h2>Limits:</h2>
            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Max new keywords count:</label>
                    <Input
                        type="number"
                        value={semanticData.keywordsProvider.maxNewKeywords}
                        onChange={({target: {value}}) => changeDataHandler('keywordsProvider', 'maxNewKeywords', value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">TPK keywords count:</label>
                    <Input
                        type="number"
                        value={semanticData.keywordsProvider.tpkKeywordsCount}
                        onChange={({target: {value}}) => changeDataHandler('keywordsProvider', 'tpkKeywordsCount', value)}
                    />
                </div>
            </div>

            <h2>Flags:</h2>
            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Create Sponsored Products Semantic Core
            </Checkbox>
            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Create Sponsored Display Semantic Core
            </Checkbox>
            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Gather variations for found ASINs
            </Checkbox>
            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Create "TCA" campaign (will use top 10 ASINs from subcategories for products)
            </Checkbox>

            <div className="form-group">
                <label htmlFor="">Add additional Top Competitors ASINs:</label>
            </div>

            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Create "TPKP" campaign
            </Checkbox>
            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Filter Semantic Core keywords using words from listings for provided products
            </Checkbox>
            <Checkbox
                // checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                // onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Filter Suggested ASINs (based on price, reviews count, rating)
            </Checkbox>

            <div className="form-group">
                <label htmlFor="">Keywords to search on Amazon for Suggested ASINs (SA campaigns):</label>
            </div>

            <div className="form-group">
                <label htmlFor="">BSR Subcategory links to fetch Category ASINs from (CA campaigns) (e.g.: <a
                    _ngcontent-dqt-c36=""
                    href="https://www.amazon.com/gp/bestsellers/lawn-garden/553966/ref=pd_zg_hrsr_lawn-garden"
                    target="_blank">https://www.amazon.com/gp/bestsellers/lawn-garden/553966/ref=pd_zg_hrsr_lawn-garden</a>):</label>
            </div>


        </div>
    )
}

export default ProductInformation