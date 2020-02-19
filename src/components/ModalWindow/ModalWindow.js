import React, {Fragment, useEffect, useState} from "react";
import {Modal, Popover} from "antd";

import './ModalWindow.less';

const ModalWindow = (props) => {
    const {visible, handleOk, handleCancel, className, okText, mask, footer, container, destroyOnClose} = props;

    useEffect(() => {
        if (container) {
            document.querySelector('.sidebar-header .anticon-menu').addEventListener('click', () => {
                setTimeout(() => {
                    if (document.querySelector('.custom-modal-wrap')) {
                        document.querySelector('.custom-modal-wrap').style.left = `${document.querySelector('.sidebar').clientWidth}px`;
                    }
                }, 400)
            })
        }
    }, []);


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
                className={`${className} custom-modal-window`}
                wrapClassName={'over-modal-wrap'}
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
};

export default ModalWindow;
