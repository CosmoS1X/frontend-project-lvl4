import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import ChannelsContainer from '../channels-container';
import MessagesContainer from '../messages-container';
import * as actions from '../../actions';
import routes from '../../routes.js';
import getModal from '../modals';

const renderModal = ({ modalShown, closeModal }) => {
  if (!modalShown) {
    return null;
  }

  const Component = getModal(modalShown);
  return <Component modalShown={modalShown} onHide={closeModal} />;
};

const MainPage = ({
  addData, addUser, showModal, closeModal, modalShown,
}) => {
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
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer onShowAddModal={() => showModal('adding')} />
        <MessagesContainer />
        {renderModal({ modalShown, closeModal })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ modalShown }) => ({ modalShown });

export default connect(mapStateToProps, actions)(MainPage);
