import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import reload from "../../../assets/img/icons/reload.svg";

const Subscription = () => {
  return (
    <div className="user-cabinet">
      <Navigation />
      <div className="automate-box">
        <div className="reactivate">
          <h3>Your Subscription Has Been Cancelled</h3>
          <p>
            You will have access to the software untill the end of this billin
            cycle <span>(August 14, 2019)</span>
          </p>
          <button type="button">
            Reactivate
            <img src={reload} alt="reload" />
          </button>
        </div>
        <div>
          <div className="automate">
            <h2>PPC Automate</h2>
            <p>Acces and edit your accounts Profit Whales subscription</p>
            <Link to="#">To view your invoices, see billing info</Link>
          </div>
          <div className="charged-box">
            <div className="charged-wrap">
              <h3>Subscription Plan</h3>
              <p>
                You’ll be charged <span>$ 347</span>
              </p>
              <div className="indicators-wrap">
                <p>
                  based on <span>$ 145 + 4%</span>
                </p>
                <Link to="#">monthly ad spend</Link>
              </div>
            </div>
            <p>
              Your Ad Spend: <span>$ 1,347</span>
            </p>
            <div className="cancel-box">
              <p>
                Next Invoice Date: <span>May 14, 2019</span>
              </p>
              <button type="button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
