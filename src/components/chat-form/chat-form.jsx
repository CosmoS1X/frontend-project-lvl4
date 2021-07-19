import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks';

const ChatForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const socket = useSocket();
  const { currentUser, currentChannelId } = useSelector(({ messagesState, channelsState }) => ({
    currentUser: messagesState.currentUser,
    currentChannelId: channelsState.currentChannelId,
  }));

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      const message = {
        user: currentUser,
        message: body,
        channelId: currentChannelId,
      };

      await socket.sendMessage(message);
      formik.resetForm();
      inputRef.current.focus();
    },
  });

  return (
    <form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <input
          autoComplete="off"
          name="body"
          data-testid="new-message"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={inputRef}
        />
        <div className="input-group-append">
          <button disabled={formik.values.body.length === 0} type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('buttons.send')}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
