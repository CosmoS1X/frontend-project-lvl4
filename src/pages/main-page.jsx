import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingIndicator from '../components/loading-indicator';
import ChannelsContainer from '../components/channels-container';
import MessagesContainer from '../components/messages-container';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import { actions } from '../slices';

const MainPage = () => {
  const history = useHistory();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let mounted = true;
    const fetchData = async () => {
      const userData = auth.getUserData();

      if (userData && userData.token) {
        try {
          const { data: { channels, messages } } = await auth.getData(userData.token);
          if (mounted) {
            setLoading(false);
          }
          dispatch(actions.initChannels(channels));
          dispatch(actions.initMessages(messages));
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

    return () => {
      mounted = false;
    };
  }, [auth, dispatch, history]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer onShowAddModal={() => dispatch(actions.showModal({ type: 'add', extraData: null }))} />
        <MessagesContainer />
      </div>
    </div>
  );
};

export default MainPage;
