import React, {useEffect, useState} from "react";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import {zthServices} from "../../../services/zth.services";
import {history} from "../../../utils/history";
import './HasIncompleteBatch.less';
import {Spin} from "antd";
import {useDispatch} from "react-redux";
import {zthActions} from "../../../actions/zth.actions";
import RouteLoader from "../../../components/RouteLoader/RouteLoader";


const HasIncompleteBatch = ({visible = false, onChange}) => {
    const [incompleteBatch, setIncompleteBatch] = useState(visible),
        [deleteProcessing, setDeleteProcessing] = useState(false),
        [fetchProcessing, setFetchProcessing] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setFetchProcessing(true);

        zthServices.checkIncompleteBatch()
            .then(res => {
                if (res.result !== null) {
                    setIncompleteBatch(res.result);

                    if (res.result.status === 'PAID') {
                        dispatch(zthActions.setPaidBatch(res.result))
                    }
                }

                setFetchProcessing(false);
            })
            .catch(() => {
                setFetchProcessing(false);
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
        <>
            <ModalWindow
                visible={incompleteBatch.status === 'DRAFT'}
                // visible={true}
                className={'has-incomplete-batch-window'}
                footer={false}
            >
                <h2>
                    Attention!
                </h2>

                <p>
                    You have unpaid Zero to Hero products. Please cancel the outstanding products to create the new
                    ones.
                </p>

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

            {fetchProcessing && <RouteLoader/>}
        </>
    )
};

export default HasIncompleteBatch;