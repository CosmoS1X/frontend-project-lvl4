import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import Message from '../message';
import ChatForm from '../chat-form';
import {
  getAllChannels, getAllMessages, getMessagesCountForCurrentChannel, getCurrentChannelId,
} from '../../selectors.js';

const getCurrentChannel = (channels, currentChannelId) => (
  channels.find(({ id }) => id === currentChannelId)?.name
);

const renderMessages = (messages, currentChannelId) => messages
  .filter(({ channelId }) => channelId === currentChannelId)
  .map(({ id, user, message }) => (
    <Message key={id} user={user} message={message} />
  ));

const MessagesContainer = () => {
  const { t } = useTranslation();

  const channels = useSelector(getAllChannels);
  const messages = useSelector(getAllMessages);
  const currentChannelId = useSelector(getCurrentChannelId);
  const messagesCount = useSelector(getMessagesCountForCurrentChannel);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [currentChannelId, messages]);

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
            {t('message', { count: messagesCount })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {renderMessages(messages, currentChannelId)}
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
