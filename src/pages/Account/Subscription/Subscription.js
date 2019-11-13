import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import reload from "../../../assets/img/icons/reload.svg";
import "./Subscription.less";

const Subscription = () => {
  return (
    <div className="user-cabinet">
      <Navigation />
      <div className="automate-box">
        <div className="reactivate">
          <h3 className="reactivate-title">
            Your Subscription Has Been Cancelled
          </h3>
          <p className="reactivate-text">
            You will have access to the software untill the end of this billin
            cycle (<span className="reactivate-data">August 14, 2019</span>)
          </p>
          <button className="reactivate-btn" type="button">
            <span>Reactivate</span>
            <img className="reactivate-img" src={reload} alt="reload" />
          </button>
        </div>
        <div className="automate">
          <div className="ppc">
            <h2 className="ppc-title">PPC Automate</h2>
            <p className="ppc-text">
              Acces and edit your accounts Profit Whales subscription
            </p>
            <Link className="ppc-link" to="/account/billing">
              To view your invoices, see billing info
            </Link>
          </div>
          <div className="plan">
            <div className="charged">
              <h3 className="charged-title">Subscription Plan</h3>
              <p className="charged-text">
                You’ll be charged <span className="charged-data">$ 347</span>
              </p>
              <div className="indicators">
                <p className="indicators-text">
                  based on <span className="indicators-data">$ 145 + 4%</span>
                </p>
                <Link className="indicators-link" to="#">
                  monthly ad spend
                </Link>
              </div>
            </div>
            <p className="plan-text">
              Your Ad Spend: <span className="plan-data">$ 1,347</span>
            </p>
          </div>
          <div className="cancel">
            <p className="cancel-text">
              Next Invoice Date:
              <span className="cancel-data">May 14, 2019</span>
            </p>
            <button className="cancel-btn" type="button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
