import React, {useEffect, useState} from "react";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import {zthServices} from "../../../services/zth.services";
import {history} from "../../../utils/history";
import './HasIncompleteBatch.less';
import {Spin} from "antd";


const HasIncompleteBatch = ({visible = false, onChange}) => {
    const [incompleteBatch, setIncompleteBatch] = useState(visible),
        [deleteProcessing, setDeleteProcessing] = useState(false);

    useEffect(() => {
        zthServices.checkIncompleteBatch()
            .then(res => {
                if (res.result !== null) {
                    setIncompleteBatch(res.result)
                }
            })
    }, []);

    const deleteBatchHandler = async () => {
        setDeleteProcessing(true);

        try {
            await zthServices.deleteIncompleteBatch(incompleteBatch.batch_id);
            setIncompleteBatch(false);
            onChange && onChange();
        } catch (e) {
            console.log(e);
        }

        setDeleteProcessing(false);
    };

    const goToPaymentPage = () => {
        history.push(`/zero-to-hero/payment/${incompleteBatch.batch_id}`)
    };

    return (
        <ModalWindow
            visible={incompleteBatch.status === 'DRAFT'}
            className={'has-incomplete-batch-window'}
            footer={false}
        >
            <h2>
                You have incomplete batch
            </h2>

            <div className={`actions ${deleteProcessing ? 'processing' : ''}`}>
                <button
                    disabled={deleteProcessing}
                    className={'btn white'}
                    onClick={deleteBatchHandler}
                >
                    Delete
                    {deleteProcessing && <Spin size={'small'}/>}
                </button>

                <button
                    disabled={deleteProcessing}
                    className={'btn default'}
                    onClick={goToPaymentPage}
                >
                    Pay
                </button>

            </div>
        </ModalWindow>
    )
};

export default HasIncompleteBatch;