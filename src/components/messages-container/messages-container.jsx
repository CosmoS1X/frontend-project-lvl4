import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import Message from '../message';
import ChatForm from '../chat-form';
import {
  getMessagesCountForCurrentChannel,
  getCurrentChannelId,
  getCurrentChannelName,
  getMessagesforCurrentChannel,
} from '../../selectors.js';

const MessagesContainer = () => {
  const { t } = useTranslation();

  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannelName = useSelector(getCurrentChannelName);
  const currenChannelMessages = useSelector(getMessagesforCurrentChannel);
  const messagesCount = useSelector(getMessagesCountForCurrentChannel);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [currentChannelId, currenChannelMessages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('message', { count: messagesCount })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currenChannelMessages.map(({ id, user, message }) => (
            <Message key={id} user={user} message={message} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
