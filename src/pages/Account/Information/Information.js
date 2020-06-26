import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {userActions} from "../../../actions/user.actions";

import Personal from './Personal';
import Password from './Password';

import './Information.less';

const Information = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo());
    }, []);

  return (
    <div className="user-cabinet">
      <Personal />

      <Password />
    </div>
  );
};

export default Information;
