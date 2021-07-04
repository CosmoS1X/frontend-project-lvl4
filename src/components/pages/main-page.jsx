import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import ChannelsContainer from '../channels-container';
import MessagesContainer from '../messages-container';
import * as actions from '../../actions';
import routes from '../../routes.js';

const MainPage = (props) => {
  console.log('MAIN PAGE PROPS:', props);
  const { addData, addUser, socketApi } = props;
  const history = useHistory();

  useEffect(async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      const { data } = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${userId.token}` } });
      addUser(userId.username);
      addData(data);

      return;
    }

    history.push('/login');
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <MessagesContainer socketApi={socketApi} />
      </div>
    </div>
  );
};

export default connect(null, actions)(MainPage);
