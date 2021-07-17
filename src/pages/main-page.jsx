import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import ChannelsContainer from '../components/channels-container';
import MessagesContainer from '../components/messages-container';
import * as actions from '../actions';
import getModal from '../components/modals';
import { useAuth } from '../hooks';
import routes from '../routes.js';

const renderModal = ({ modalShown, closeModal }) => {
  const { modalName } = modalShown;
  if (!modalName) {
    return null;
  }

  const Component = getModal(modalName);
  return <Component modalShown={modalShown} onHide={closeModal} />;
};

const MainPage = ({
  addData, addUser, showModal, closeModal, modalShown, setLoading,
}) => {
  const history = useHistory();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const userData = auth.getUserData();

      if (userData && userData.token) {
        try {
          const { data } = await auth.getData(userData.token);
          addUser(userData.username);
          addData(data);
          setLoading(false);
        } catch (err) {
          if (err.isAxiosError && err.response.status === 401) {
            auth.logOut();
            history.push(routes.loginPage());
          }
          throw err;
        }
      }
    };

    fetchData();
  }, [addData, addUser, setLoading, auth, history]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer onShowAddModal={() => showModal({ modalName: 'add', id: null })} />
        <MessagesContainer />
        {renderModal({ modalShown, closeModal })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ modalShown }) => ({ modalShown });

export default connect(mapStateToProps, actions)(MainPage);
