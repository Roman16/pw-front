import React, {useState} from "react";
import plusIcon from '../../../../assets/img/icons/plus-blue.svg';
import plusIconWhite from '../../../../assets/img/icons/plus-white.svg';
import AddMetricModal from "./AddMetricModal";

const AddMetric = () => {
    const [visibleModal, switchModal] = useState(false);


    const openModal = () => switchModal(true);
    const handleOk = () => switchModal(false);
    const handleCancel = () => switchModal(false);

    return (
        <div className='add-metric'>
            <div className="add-metric__button" onClick={openModal}>
                <img src={plusIcon} alt="" className='blue'/>
                <img src={plusIconWhite} alt="" className='white'/>

                Add Metric
            </div>

            <AddMetricModal
                visibleModal={visibleModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    )
};

export default AddMetric;