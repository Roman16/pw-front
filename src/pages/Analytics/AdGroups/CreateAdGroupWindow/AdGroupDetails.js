import React from "react"
import {Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {InfinitySelect} from "../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"
import _ from "lodash"

const Option = Select.Option

const AdGroupDetails = ({createData, onChange, selectedCampaign, campaigns, getCampaigns}) => {
    const changeCampaignHandler = value => {
        onChange(({
            ...createData,
            campaignId: value,
            campaignName: _.find(campaigns, {campaignId: value}).name,
        }))
    }

    return (<div className={'step step-2 ad-group-details-step'}>
        {!selectedCampaign && <>
            <div className={`row`}>
                <div className="col w-p">
                    <div className="form-group">
                        <label htmlFor="">Advertising Type</label>
                        <CustomSelect
                            placeholder={'Select by'}
                            getPopupContainer={trigger => trigger.parentNode}
                            onChange={(value) => onChange({advertisingType: value})}
                            value={createData.advertisingType}
                        >
                            <Option value={'SponsoredProducts'}>
                                Sponsored Products
                            </Option>

                            <Option value={'SponsoredDisplay'}>
                                Sponsored Display
                            </Option>
                        </CustomSelect>
                    </div>

                </div>

                <div className="col description">

                </div>
            </div>

            <div className={`row`}>
                <div className="col w-p">
                    <div className="form-group">
                        <InfinitySelect
                            label={'Select Campaign'}
                            placeholder={'Select campaign'}
                            value={createData.campaignId}
                            onChange={changeCampaignHandler}
                            disabled={!createData.advertisingType}
                            children={campaigns}
                            onLoadMore={(page, cb, searchStr) => getCampaigns(createData.advertisingType, page, cb, searchStr)}
                            reloadPage={createData.advertisingType}
                            dataKey={'campaignId'}
                            notFoundContent={'No campaigns'}
                        />
                    </div>
                </div>

                <div className="col description">

                </div>
            </div>
        </>}

        <div className={`row`}>
            <div className="col w-p">
                <div className="form-group ">
                    <label htmlFor="">Ad Group Name</label>
                    <Input
                        placeholder={'Ad Group Name'}
                        value={createData.name}
                        onChange={({target: {value}}) => onChange({name: value})}
                        disabled={!createData.campaignId}/>
                </div>
            </div>

            <div className="col description">
                Choose an ad group name that you can easily identify and refer to later.
            </div>
        </div>

        <div className={`row`}>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="">Default bid</label>
                    <InputCurrency
                        step={0.01}
                        value={createData.defaultBid}
                        onChange={(value) => onChange({defaultBid: value})}
                        disabled={!createData.campaignId}
                    />
                </div>
            </div>

            <div className="col description">
                Default bid applies to all clicks unless you set a different bid for a keyword.
            </div>
        </div>
    </div>)
}

export default AdGroupDetails
