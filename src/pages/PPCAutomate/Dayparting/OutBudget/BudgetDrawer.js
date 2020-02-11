import React, {useEffect, useState, Fragment} from "react";
import {Radio} from "antd";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const BudgetDrawer = ({onClose, onSave}) => {
    const [selectedRadio, setRadio] = useState('recommend'),
        [userBudget, setBudget] = useState(0);

    function changesRadioHandler(e) {
        setRadio(e.target.value)
    }

    function changesInputHandler(value) {
        setBudget(value)
    }

    function saveHandler() {
        onSave({
            type: selectedRadio,
            value: userBudget
        });
    }


    return (
        <Fragment>
            <Radio.Group value={selectedRadio} onChange={changesRadioHandler}>
                <div className="current-budget">
                    Current budget

                    <span className='value'>$180.00</span>
                </div>

                <div className="recommend-budget">
                    <Radio value={'recommend'}>
                        Recommended budget
                    </Radio>

                    <span className='value'>$182.00</span>
                </div>

                <div className="custom-budget">
                    <Radio value={'custom'}>
                        Enter your budget
                    </Radio>

                    <InputCurrency
                        value={userBudget}
                        onChange={changesInputHandler}
                        disabled={selectedRadio === 'recommend'}
                    />
                </div>
            </Radio.Group>

            <div className="actions">
                <button className='btn default' onClick={onClose}>Cancel</button>

                <button className='btn green-btn' onClick={saveHandler}>Apply</button>
            </div>
        </Fragment>
    )
};

export default BudgetDrawer;