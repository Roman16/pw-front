import React from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"

const {Option, OptGroup} = Select

const Filters = ({language, marketplace, onChangeLanguage, onChangeMarketplace, onReset}) => {

    return (
        <div className="filters">
            <div className="form-group">
                <label htmlFor="">Language:</label>
                <CustomSelect
                    value={language}
                    onChange={onChangeLanguage}
                >
                    <Option value={'en'}>English</Option>
                    <Option value={'de'}>German</Option>
                    <Option value={'fr'}>French</Option>
                    <Option value={'it'}>Italian</Option>
                    <Option value={'es'}>Spanish</Option>
                </CustomSelect>
            </div>
            <div className="form-group">
                <label htmlFor="">Marketplace:</label>
                <CustomSelect
                    value={marketplace}
                    onChange={onChangeMarketplace}
                >
                    <OptGroup label="Americas">
                        <Option value="amazon.com">Amazon.com (United States)</Option>
                        <Option value="amazon.ca">Amazon.ca (Canada)</Option>
                        <Option value="amazon.com.mx">Amazon.com.mx (Mexico)</Option>
                        <Option value="amazon.com.br">Amazon.com.br</Option>
                    </OptGroup>
                    <OptGroup label="Europe">
                        <Option value="amazon.de">Amazon.de (Germany)</Option>
                        <Option value="amazon.co.uk">Amazon.co.uk (United Kingdom)</Option>
                        <Option value="amazon.fr">Amazon.fr (France)</Option>
                        <Option value="amazon.it">Amazon.it (Italy)</Option>
                        <Option value="amazon.es">Amazon.es (Spain)</Option>
                        <Option value="amazon.nl">Amazon.nl (Netherlands)</Option>
                    </OptGroup>
                    <OptGroup label="Middle East and North Africa">
                        <Option value="amazon.ae">Amazon.ae (United Arab Emirates)</Option>
                        <Option value="amazon.com.tr">Amazon.com.tr (Turkey)</Option>
                    </OptGroup>
                    <OptGroup label="Asia-Pacific">
                        <Option value="amazon.jp">Amazon.jp (Japan)</Option>
                        <Option value="amazon.com.au">Amazon.com.au (Australia)</Option>
                        <Option value="amazon.sg">Amazon.sg (Singapore)</Option>
                        <Option value="amazon.in">Amazon.in (India)</Option>
                    </OptGroup>
                </CustomSelect>
            </div>

            <div/>

            <button className="btn default reset" onClick={onReset}>
                Reset All
            </button>
        </div>

    )
}

export default Filters