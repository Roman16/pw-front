import React from 'react';

import Navigation from '../Navigation/Navigation';
import Personal from './Personal';
import Password from './Password';
import Seller from './Seller';
import Amazone from './Amazone';
import Connectors from './Connectors';
import Soon from './Soon';
import Info from './Info';
import './Information.less';

const Information = () => {
  return (
    <div className="user-cabinet">
      <Navigation />
      <Personal />
      <Password />
      <Seller />
      <Amazone />
      <Connectors />
      <Soon />
      <Info />
    </div>
  );
};

export default Information;
