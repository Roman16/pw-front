import React, {Fragment, useState} from "react"
import './SaveChanges.less'
import {useDispatch, useSelector} from "react-redux"
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup"
import {productsActions} from "../../../../actions/products.actions"
import {Spin} from "antd"

const SaveChanges = ({product, hasChanges, onStart, onRevert, processing}) => {
    const dispatch = useDispatch()

    const dontShowStartNotificationAgain = useSelector(state => state.products.dontShowStartNotificationAgain)

    const [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false),
        [showAgainWindow, setShowAgainWindow] = useState(dontShowStartNotificationAgain)

    const startOptimizationHandler = () => {
        dispatch(productsActions.dontShowWindowAgain({
            windowName: 'START',
            status: showAgainWindow
        }))

        onStart()

        setVisibleConfirmWindow(false)
    }

    const confirmStartOptimization = () => {
        if (dontShowStartNotificationAgain) {
            onStart()
        } else {
            setVisibleConfirmWindow(true)
        }
    }

    return (
        <>
            <section className={`save-changes-section ${hasChanges ? 'visible' : ''}`}>
                {product.status === 'RUNNING' ? <>
                    <p>You have unsaved changes</p>

                    <div className="buttons">
                        <button
                            className={'btn default'}
                            onClick={onRevert}
                        >
                            Revert
                        </button>

                        <button
                            className={'btn white'}
                            disabled={processing}
                            onClick={onStart}
                        >
                            Save Changes

                            {processing && <Spin size={'small'}/>}
                        </button>
                    </div>
                </> : <>
                    <p>You have unsaved changes</p>

                    <div className="buttons">
                        <button
                            className={'btn white'}
                            onClick={confirmStartOptimization}
                            disabled={processing}
                        >
                            Start Optimization

                            {processing && <Spin size={'small'}/>}
                        </button>
                    </div>
                </>}


            </section>

            <ConfirmActionPopup
                visible={visibleConfirmWindow}
                handleOk={startOptimizationHandler}
                handleCancel={() => setVisibleConfirmWindow(false)}
                handleChangeCheckbox={(e) => setShowAgainWindow(e.target.checked)}
                title={'Are you ready to start?'}
                description={'This action will result in the automatic management of your campaigns by our algorithm.'}
                checkboxText={`Don't show this message again`}
            />
        </>
    )
}

export default SaveChanges
