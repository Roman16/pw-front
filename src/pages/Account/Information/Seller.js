import React from 'react';

import whales from '../../../assets/img/whales.svg';
import plus from '../../../assets/img/icons/plus-white.svg';

const Seller = () => {
  return (
    <div className="seller-box">
      <img src={whales} alt="whales" />
      <div className="seller-wrap">
        <h2 className="seller-title">Seller Central Connections</h2>
        <p className="seller-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <button className="seller-btn" type="button">
        <img src={plus} alt="plus" />
        Add New Account
      </button>
    </div>
  );
};

export default Seller;
