import React from 'react';

const Modal = () => {
  return (
    <div>
      <div className="bgd"></div>
      <div className="modal">
        <h3 className="title">Cancel Your Account</h3>
        <img />
        <h2 className="main-title">
          Did you know that you can pause your ProfitWhales subscription?
        </h2>
        <p className="main-text">
          <span>Don't lose all of your work!</span> When you pause your
          ProfitWhales account you will still have access to all your
          Advertising Data Points
        </p>
        <p className="text">
          Pause your account for a lowered price to
          <span>$19.99/month</span>
        </p>
        <div className="advantages-wrap">
          <div className="access">
            <img className="access-img" />
            <p className="access-text">
              Have access to the dashboard and advertising change history
            </p>
          </div>
          <div className="data">
            <img className="data-img" />
            <p className="data-text">Don’t lose the valuable data</p>
          </div>
          <div className="click">
            <img className="click-img" />
            <p className="click-text">One click to renuew your subscription</p>
          </div>
        </div>
        <div className="btn-wrap"></div>
      </div>
    </div>
  );
};

export default Modal;
