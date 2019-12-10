import React, {Fragment} from "react";

import ProductsList from "./ProductsList/ProductsList";
import FreeTrial from "../../../components/FreeTrial/FreeTrial";
import "./ProductSettings.less";
import SubscriptionNotificationWindow from "../../../components/ModalWindow/SubscriptionNotificationWindow";

const ProductSettingsMain = () => {
  return (
    <div className="product-settings-page">
      <div className="page-caption">
        <h3 className="main-title">REMINDER</h3>
        <FreeTrial product={'ppc'}/>
      </div>

      <div className="reminder">
        <div className="reminder-title">
          For those using campaign strategies in Seller Central:
        </div>
        <div>
          All campaigns better to be set to "Dynamic bids - down only." or
          "Fixed Bids." bidding strategy. Additionally, "Adjust bids by
          placement" should be set to 0% (default) as it will negatively affect
          your performance with our algorithm. Also, you should have only one
          Active SKU per Ad Group.
        </div>
      </div>

      <ProductsList />

        <SubscriptionNotificationWindow product={'ppc'}/>

    </div>
  );
};

export default ProductSettingsMain;
