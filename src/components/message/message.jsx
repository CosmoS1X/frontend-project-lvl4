import React from 'react';

const Message = ({ user, message }) => (
  <div>
    <b>{user}</b>
    {': '}
    {message}
  </div>
);

export default Message;
