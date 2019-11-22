import React, { useState } from 'react';
import { Drawer, Modal } from 'antd';

import Navigation from '../Navigation/Navigation';
import PPCAutomate from './PPCAutomate';
import CancelAccountWindow from './DrawerWindows/CancelAccountWindow';
import Reactivate from './DrawerWindows/Reactivate';
import './Subscription.less';
import './DrawerWindows/CancelAccountWindow.less';
import './DrawerWindows/Reactivate.less';

const Subscription = () => {
  const [openedAccountWindow, openAccountWindow] = useState(false);
  function handleOpenAccountWindow() {
    openAccountWindow(true);
  }

  const [openedReactivateWindow, openReactivateWindow] = useState(false);
  function handleOpenReactivateWindow() {
    openReactivateWindow(true);
  }

  return (
    <div className="user-cabinet">
      <Navigation />

      <PPCAutomate
        onOpenAccountWindow={handleOpenAccountWindow}
        onOpenReactivateWindow={handleOpenReactivateWindow}
      />

      <Drawer
        className="cancel-account"
        placement="right"
        closable
        onClose={() => openAccountWindow(false)}
        visible={openedAccountWindow}
      >
        <CancelAccountWindow />
      </Drawer>

      <Modal
        className="reactivate-account"
        closable
        centered
        okText="Reactivate my account"
        onOk={() => openReactivateWindow(false)}
        cancelText="Cancel"
        onCancel={() => openReactivateWindow(false)}
        visible={openedReactivateWindow}
      >
        <Reactivate />
      </Modal>
    </div>
  );
};

export default Subscription;
