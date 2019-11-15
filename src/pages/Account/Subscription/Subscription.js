import React, { useState } from 'react';
import { Drawer } from 'antd';

import Navigation from '../Navigation/Navigation';
import PPCAutomate from './PPCAutomate';
import CancelAccountWindow from './DrawerWindows/CancelAccountWindow';
import './Subscription.less';
import './DrawerWindows/CancelAccountWindow.less';

const Subscription = () => {
  const [openedWindow, openWindow] = useState(null);

  function handleOpenWindow(window) {
    openWindow(window);
  }

  function handleCloseWindow() {
    openWindow(null);
  }

  return (
    <div className="user-cabinet">
      <Navigation />

      <PPCAutomate onOpenWindow={handleOpenWindow} />

      <Drawer
        placement="right"
        className="cancel-account"
        closable={false}
        onClose={() => openWindow(null)}
        visible={openedWindow}
      >
        <CancelAccountWindow onCloseWindow={handleCloseWindow} />
      </Drawer>
    </div>
  );
};

export default Subscription;
