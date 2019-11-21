import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {userActions} from "../../../actions/user.actions";

import Navigation from '../Navigation/Navigation';
import Personal from './Personal';
import Password from './Password';
import Seller from './AmazonConnection/Seller';

import './Information.less';

const Information = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo());
    }, []);

  return (
    <div className="user-cabinet">
      <Navigation />

      <Personal />

      <Password />

      <Seller />
    </div>
  );
};

export default Information;
