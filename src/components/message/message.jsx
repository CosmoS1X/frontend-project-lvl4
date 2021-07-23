import React from 'react';

const Message = ({ user, message }) => (
  <div className="text-break mb-2">
    <b>{user}</b>
    {': '}
    {message}
  </div>
);

export default Message;
