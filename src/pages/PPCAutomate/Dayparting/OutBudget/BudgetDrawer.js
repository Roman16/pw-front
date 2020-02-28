import React, {useState, Fragment, useEffect} from "react";
import {Radio, Spin} from "antd";
import {useSelector} from "react-redux";
import InputCurrency from "../../../../components/Inputs/InputCurrency";
import {daypartingServices} from "../../../../services/dayparting.services";

const BudgetDrawer = ({onClose, onSave, processing}) => {
    const [selectedRadio, setRadio] = useState('recommend'),
        [userBudget, setBudget] = useState(0),
        [dailyBudget, setDailyBudget] = useState(0),
        [recommendedBudget, setRecommendedBudget] = useState(0);

    const {campaignId} = useSelector(state => ({
        campaignId: state.products.selectedProduct.id,
    }));

    function changesRadioHandler(e) {
        setRadio(e.target.value)
    }

    function changesInputHandler(value) {
        setBudget(value)
    }

    function saveHandler() {
        onSave({
            type: selectedRadio,
            value: selectedRadio === 'recommend' ? recommendedBudget : userBudget
        });
    }

    useEffect(() => {
        daypartingServices.getRecommendedBudget(campaignId)
            .then(res => {
                setDailyBudget(res.response.statistics.current.daily_budget);
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

                    <span className='value'>${recommendedBudget || 0}</span>
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

                    <button className='btn green-btn' onClick={saveHandler}>Apply</button>
                </Fragment>}
            </div>
        </Fragment>
    )
};

export default BudgetDrawer;