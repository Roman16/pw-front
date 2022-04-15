import React, {Fragment, useEffect} from "react"
import {Modal} from "antd"

import './ModalWindow.less'

const ModalWindow = (props) => {
    const {visible, handleOk, handleCancel, className, okText, mask, footer, container, destroyOnClose, wrapClassName = ''} = props

    useEffect(() => {
        if (container) {
            document.querySelector('.sidebar-header .burger').addEventListener('click', () => {
                setTimeout(() => {
                    if (document.querySelector('.custom-modal-wrap')) {
                        document.querySelector('.custom-modal-wrap').style.left = `${document.querySelector('.sidebar').clientWidth}px`
                    }
                }, 400)
            })
        }
    }, [])


    if (container) {
        return (
            <Modal
                className={`${className} custom-modal-window`}
                wrapClassName={'custom-modal-wrap'}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={okText}
                getContainer={() => document.querySelector('.main-container')}
                mask={mask}
                footer={footer}
            >
                <Fragment>
                    {props.children}
                </Fragment>
            </Modal>

        )
    } else {
        return (
            <Modal
                {...props}
                className={`${className} custom-modal-window`}
                wrapClassName={`${wrapClassName} over-modal-wrap`}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={okText}
                mask={mask}
                footer={footer}
                destroyOnClose={destroyOnClose}
            >
                <Fragment>
                    {props.children}
                </Fragment>
            </Modal>

        )

    }
}

export default ModalWindow
