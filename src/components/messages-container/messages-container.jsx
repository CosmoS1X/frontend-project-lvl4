import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import * as actions from '../../actions';
import Message from '../message';
import ChatForm from '../chat-form';

const getCurrentChannel = (channels, currentChannelId) => {
  if (channels.length === 0) {
    return '';
  }

  const [current] = channels.filter(({ id }) => id === currentChannelId);
  return current.name;
};

const renderMessages = (messages, currentChannelId) => messages
  .filter(({ channelId }) => channelId === currentChannelId)
  .map(({
    id,
    user,
    message,
    date,
  }) => (
    <Message key={id} user={user} message={message} date={date} />
  ));

const MessagesContainer = ({
  channels,
  messages,
  currentChannelId,
  loading,
}) => {
  const { t } = useTranslation();
  const count = useSelector((state) => state.messages
    .filter(({ channelId }) => channelId === currentChannelId).length);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {getCurrentChannel(channels, currentChannelId)}
            </b>
          </p>
          <span className="text-muted">
            {t('message', { count })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {loading ? <Spinner animation="border" variant="primary" /> : renderMessages(messages, currentChannelId)}
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  channels,
  currentChannelId,
  messages,
  loading,
}) => ({
  channels,
  currentChannelId,
  messages,
  loading,
});

export default connect(mapStateToProps, actions)(MessagesContainer);
