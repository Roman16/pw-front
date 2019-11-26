import React from "react";
import { Link } from "react-router-dom";

import reload from "../../../assets/img/icons/reload.svg";
import ppcIcon from "../../../assets/img/icons/ppc-automate-icon.svg";

const PPCAutomate = ({ onOpenAccountWindow, onOpenReactivateWindow }) => {
  return (
    <div className="automate-box">
      <div className="reactivate">
        <h3 className="reactivate-title">
          Your Subscription Has Been Cancelled
        </h3>
        <p className="reactivate-text">
          You will have access to the software untill the end of this billin
          cycle (<span className="reactivate-data">August 14, 2019</span>)
        </p>
        <button
          className="reactivate-btn"
          type="button"
          onClick={onOpenReactivateWindow}
        >
          Reactivate
          <img className="reactivate-img" src={reload} alt="reload" />
        </button>
      </div>
      <div className="automate">
        <div className="ppc">
          <div className="ppc-title-wrap">
            <img className="ppc-icon" src={ppcIcon} alt="icon" />
            <h2 className="ppc-title">PPC Automate</h2>
          </div>
          <p className="ppc-text">
            Acces and edit your accounts Profit Whales subscription
          </p>
          <p className="ppc-link-wrap">
            To view your invoices, see&nbsp;
            <Link className="ppc-link" to="/account-billing">
              billing info
            </Link>
          </p>
        </div>
        <div className="plan">
          <div className="charged">
            <div className="charged-wrap">
              <h3 className="charged-title">Subscription Plan</h3>
              <div className="charged-description">
                <p className="charged-text">You’ll be charged</p>
                <p className="charged-data">$ 347</p>
              </div>
            </div>
            <div className="indicators">
              <p className="indicators-text">
                based on{" "}
                <span className="indicators-data">
                  $ 145 + 4%<sub>monthly ad spend</sub>
                </span>
              </p>
            </div>
          </div>
          <p className="plan-text">
            Your Ad Spend: <span className="plan-data">$ 1,347</span>
          </p>
        </div>
        <div className="cancel">
          <p className="cancel-text">
            Next Invoice Date: <span className="cancel-data">May 14, 2019</span>
          </p>
          <button
            className="cancel-btn"
            type="button"
            onClick={onOpenAccountWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PPCAutomate;
