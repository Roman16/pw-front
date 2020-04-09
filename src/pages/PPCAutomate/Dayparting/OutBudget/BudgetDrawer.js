import React, {useState, Fragment, useEffect} from "react";
import {Radio, Spin} from "antd";
import {useSelector} from "react-redux";
import InputCurrency from "../../../../components/Inputs/InputCurrency";
import {daypartingServices} from "../../../../services/dayparting.services";
import {notification} from "../../../../components/Notification";

const BudgetDrawer = ({onClose, onSave, processing}) => {
    const [selectedRadio, setRadio] = useState('recommend'),
        [userBudget, setBudget] = useState(0),
        [recommendedBudget, setRecommendedBudget] = useState(false);

    const {campaignId, dailyBudget} = useSelector(state => ({
        campaignId: state.products.selectedProduct.id,
        dailyBudget: state.products.selectedProduct.dailyBudget
    }));

    function changesRadioHandler(e) {
        setRadio(e.target.value)
    }

    function changesInputHandler(value) {
        setBudget(value)
    }

    function saveHandler() {
        if(selectedRadio === 'recommend' && !recommendedBudget) {
            notification.error({title: 'Enter budget'})
        } else {
            onSave({
                type: selectedRadio,
                value: selectedRadio === 'recommend' ? recommendedBudget : userBudget
            });
        }
    }

    useEffect(() => {
        daypartingServices.getRecommendedBudget(campaignId)
            .then(res => {
                setRecommendedBudget(res.response.statistics.recommended.daily_budget);
            })
    }, []);


    return (
        <Fragment>
            <Radio.Group value={selectedRadio} onChange={changesRadioHandler}>
                <div className="current-budget">
                    Current budget

                    <span className='value'>${dailyBudget}</span>
                </div>

                <div className="recommend-budget">
                    <Radio value={'recommend'}>
                        Recommended budget
                    </Radio>

                    <span className='value'>{recommendedBudget ? `$${recommendedBudget}` : <Spin size={"small"}/>}</span>
                </div>

                <div className="custom-budget">
                    <Radio value={'custom'}>
                        Enter your budget
                    </Radio>

                    <InputCurrency
                        value={userBudget}
                        onChange={changesInputHandler}
                        disabled={selectedRadio === 'recommend'}
                        max={1000000}
                        min={1}
                    />
                </div>
            </Radio.Group>

            <div className="actions">
                {processing ? <Spin/> : <Fragment>
                    <button className='btn white' onClick={onClose}>Cancel</button>

                    <button className='btn default' onClick={saveHandler}>Apply</button>
                </Fragment>}
            </div>
        </Fragment>
    )
};

export default BudgetDrawer;