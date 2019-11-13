import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import AccountInformation from "./AccountInformation";
import "./Account.less";

const Account = () => {
  return (
    <div className="user-cabinet">
      <Navigation />
      <Switch>
        <Route exact path="/account/settings" component={AccountInformation} />
        {/* <Route exact path="/account/billing" component={AccountInformation} /> */}
        {/* <Route exact path="/account/subscription" component={AccountInformation} /> */}
      </Switch>
    </div>
  );
};

export default Account;
