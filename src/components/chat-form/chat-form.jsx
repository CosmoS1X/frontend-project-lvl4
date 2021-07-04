import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const ChatForm = ({
  socketApi,
  currentChannelId,
  currentUser,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      const message = {
        user: currentUser,
        message: body,
        channelId: currentChannelId,
      };

      socketApi.sendMessage(message);
      formik.resetForm();
      inputRef.current.focus();
    },
  });

  return (
    <form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <input
          name="body"
          data-testid="new-message"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={inputRef}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({
  channels,
  currentChannelId,
  currentUser,
  messages,
}) => ({
  channels,
  currentChannelId,
  currentUser,
  messages,
});

export default connect(mapStateToProps, actions)(ChatForm);
