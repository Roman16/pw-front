import React, {useEffect, useState} from "react"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {RuleInformation} from "../CreateRulesWindow/RuleInformation"
import WindowFooter from "../../Analytics/Campaigns/CreateCampaignWindow/WindowFooter"

export const EditRuleWindow = ({visible, rule, processing, onClose, onSave}) => {
    const [editRule, setEditRule] = useState({...rule})

    useEffect(() => {
        setEditRule({...rule})
    }, [rule])


    const saveHandler = () => {
        onSave({
            ...editRule,
            active: editRule.active || false,
            condition: JSON.stringify(editRule.condition),
            actions: JSON.stringify(editRule.actions),
        })
    }

    return (<ModalWindow
            visible={visible}
            footer={false}
            className={'create-rules-window'}
        >
            <WindowHeader
                title={'Edit Rule'}
                onClose={onClose}
            />

            <RuleInformation
                data={editRule}
                disabledAutomaticSwitch={true}
                onChange={(data) => setEditRule({...editRule, ...data})}
            />

            <WindowFooter
                currentStep={0}
                steps={['Edit']}
                createButtonTitle={'Save'}
                processing={processing}

                disableNextStep={false}
                onCreate={saveHandler}
            />
        </ModalWindow>
    )
}