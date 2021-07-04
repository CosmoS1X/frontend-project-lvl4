import React from 'react';

const Message = ({ user, message, date }) => (
  <div>
    [
    {date}
    ]
    {' '}
    <b>{user}</b>
    {': '}
    {message}
  </div>
);

export default Message;
