import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Channel from '../channel';
import Message from '../message';
import * as actions from '../../actions';
import routes from '../../routes.js';

const MainPage = ({
  channels,
  currentChannelId,
  messages,
  addData,
  changeChannel,
}) => {
  const history = useHistory();

  useEffect(async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      const { data } = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${userId.token}` } });
      addData(data);

      return;
    }

    history.push('/login');
  }, []);

  const findCurrentChannelName = () => {
    if (channels.length === 0) {
      return '';
    }

    const [current] = channels.filter((channel) => channel.id === currentChannelId);
    return current.name;
  };

  const renderChannel = (channel) => (
    <Channel
      key={channel.id}
      id={channel.id}
      name={channel.name}
      currentChannel={currentChannelId}
      onClick={() => changeChannel(channel.id)}
    />
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => renderChannel(channel))}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {findCurrentChannelName()}
                </b>
              </p>
              <span className="text-muted">
                {messages.filter(({ channelId }) => channelId === currentChannelId).length}
                {' '}
                сообщений
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {messages
                .filter(({ channelId }) => channelId === currentChannelId)
                .map(({ id, user, message }) => (
                  <Message key={id} user={user} message={message} />
                ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input name="body" data-testid="new-message" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
                  <div className="input-group-append">
                    <button disabled type="submit" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { channels, currentChannelId, messages } = state;

  return { channels, currentChannelId, messages };
};

export default connect(mapStateToProps, actions)(MainPage);
