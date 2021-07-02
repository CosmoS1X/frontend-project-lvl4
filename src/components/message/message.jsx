import React from 'react';

const Message = ({ user, message }) => (
  <div>
    <span><b>{user}</b></span>
    {': '}
    <span>{message}</span>
  </div>
);

export default Message;
