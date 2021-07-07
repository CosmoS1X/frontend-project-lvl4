import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import ChannelsContainer from '../channels-container';
import MessagesContainer from '../messages-container';
import { Add } from '../modals';
import * as actions from '../../actions';
import routes from '../../routes.js';

const MainPage = ({ addData, addUser }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      const { data } = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${userId.token}` } });
      addUser(userId.username);
      addData(data);

      return;
    }

    history.push('/login');
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer onShowAddModal={handleShow} />
        <MessagesContainer />
        {show ? <Add show={show} onHide={handleClose} /> : null}
      </div>
    </div>
  );
};

export default connect(null, actions)(MainPage);

// {show ? <Remove show={show} onHide={handleClose} /> : null}
// {show ? <Rename show={show} onHide={handleClose} /> : null}
