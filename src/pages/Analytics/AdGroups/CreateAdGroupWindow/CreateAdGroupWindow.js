import React, {useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Input, Radio, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import AdGroupDetails from "../../Campaigns/CreateCampaignWindow/CreateSteps/AdGroupDetails"

const Option = Select.Option

const CreateAdGroupWindow = () => {
    const [createAdGroupData, setCreateAdGroupData] = useState({
        ad_group_name: '',
        default_bid: 0,
    })

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.adGroup)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({adGroup: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateAdGroupData(prevState => ({...prevState, ...value}))
    }

    const onCreate = () => {

    }

    return (<ModalWindow
            className={'create-campaign-window create-ad-group-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Ad Group'}
                onClose={closeWindowHandler}
            />

            <div className="create-steps">
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                >
                    Create Ad Group
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreateAdGroupWindow
