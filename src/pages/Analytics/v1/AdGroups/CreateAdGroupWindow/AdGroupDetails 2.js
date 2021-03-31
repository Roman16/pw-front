import React from "react"
import {Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import InputCurrency from "../../../../components/Inputs/InputCurrency"

const Option = Select.Option

const AdGroupDetails = ({createData, onChange, selectedCampaign}) => {
    return (<div className={'step step-2 ad-group-details-step'}>
        {!selectedCampaign && <>
            <div className={`row`}>
                <div className="col">
                    <div className="form-group w-50">
                        <label htmlFor="">Advertising Type</label>
                        <CustomSelect
                            placeholder={'Select by'}
                            getPopupContainer={trigger => trigger.parentNode}
                            onChange={(value) => onChange({advertising_type: value})}
                            value={createData.advertising_type}
                        >
                            <Option value={'sponsored_products'}>
                                Sponsored Products
                            </Option>

                            <Option value={'sponsored_display'}>
                                Sponsored Display
                            </Option>
                        </CustomSelect>
                    </div>

                </div>

                <div className="col description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                    consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                    massa
                    faucibus blandit justo. Sed et orci tortor pellentesque sed
                </div>
            </div>

            <div className={`row`}>
                <div className="col">
                    <div className="form-group w-50">
                        <label htmlFor="">Select Campaign</label>
                        <CustomSelect
                            placeholder={'Select by'}
                            getPopupContainer={trigger => trigger.parentNode}
                            onChange={(value) => onChange({selected_campaign: value})}
                            value={createData.selected_campaign}
                            disabled={!createData.advertising_type}
                        >
                            <Option value={'445'}>
                                Campaign
                            </Option>
                        </CustomSelect>
                    </div>
                </div>

                <div className="col description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                    consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                    massa
                    faucibus blandit justo. Sed et orci tortor pellentesque sed
                </div>
            </div>
        </>}

        <div className={`row`}>
            <div className="col">
                <div className="form-group w-50">
                    <label htmlFor="">Ad Group Name</label>
                    <Input
                        placeholder={'Ad Group Name'}
                        value={createData.ad_group_name}
                        onChange={({target: {value}}) => onChange({ad_group_name: value})}
                        disabled={!createData.selected_campaign}/>
                </div>
            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>

        <div className={`row`}>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="">Default bid</label>
                    <InputCurrency
                        step={0.01}
                        value={createData.ad_group_default_bid}
                        onChange={(value) => onChange({ad_group_default_bid: value})}
                        disabled={!createData.selected_campaign}
                    />
                </div>

            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>
    </div>)
}

export default AdGroupDetails
