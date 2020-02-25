import React, {useState, Fragment} from "react";
import {Radio, Spin} from "antd";
import {useSelector} from "react-redux";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const BudgetDrawer = ({onClose, onSave, processing}) => {
    const [selectedRadio, setRadio] = useState('recommend'),
        [userBudget, setBudget] = useState(0);

    const {dailyBudget} = useSelector(state => ({
        dailyBudget: state.products.selectedProduct.dailyBudget
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
            value: selectedRadio === 'recommend' ? 100 : userBudget
        });
    }


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

                    <span className='value'>$100.00</span>
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