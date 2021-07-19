import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChannelsContainer from '../components/channels-container';
import MessagesContainer from '../components/messages-container';
import getModal from '../components/modals';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import { actions } from '../reducers';

const RenderModal = ({ modalShown }) => {
  const { modalName } = modalShown;
  const dispatch = useDispatch();

  if (!modalName) {
    return null;
  }

  const Component = getModal(modalName);
  return <Component modalShown={modalShown} onHide={() => dispatch(actions.closeModal({ modalName: 'remove', id: null }))} />;
};

const MainPage = () => {
  const history = useHistory();
  const auth = useAuth();
  const modalShown = useSelector((state) => state.modalState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const userData = auth.getUserData();

      if (userData && userData.token) {
        try {
          const { data: { channels, messages } } = await auth.getData(userData.token);
          dispatch(actions.setUser(userData.username));
          dispatch(actions.getChannels(channels));
          dispatch(actions.getMessages(messages));
          dispatch(actions.setLoading(false));
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
  }, [auth, dispatch, history]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer onShowAddModal={() => dispatch(actions.showModal({ modalName: 'add', id: null }))} />
        <MessagesContainer />
        <RenderModal modalShown={modalShown} />
      </div>
    </div>
  );
};

export default MainPage;
