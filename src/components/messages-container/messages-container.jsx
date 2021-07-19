import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Message from '../message';
import ChatForm from '../chat-form';

const getCurrentChannel = (channels, currentChannelId) => {
  if (channels.length === 0) {
    return '';
  }

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  return currentChannel.name;
};

const renderMessages = (messages, currentChannelId) => messages
  .filter(({ channelId }) => channelId === currentChannelId)
  .map(({ id, user, message }) => (
    <Message key={id} user={user} message={message} />
  ));

const MessagesContainer = () => {
  const { t } = useTranslation();
  const {
    channels,
    messages,
    currentChannelId,
    loading,
  } = useSelector(({ channelsState, messagesState, loadingState }) => ({
    channels: channelsState.channels,
    messages: messagesState.messages,
    currentChannelId: channelsState.currentChannelId,
    loading: loadingState.loading,
  }));

  const count = messages
    .filter(({ channelId }) => channelId === currentChannelId).length;

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

export default MessagesContainer;
