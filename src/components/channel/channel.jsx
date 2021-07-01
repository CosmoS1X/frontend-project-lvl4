import React from 'react';
import cn from 'classnames';

const Channel = ({
  id,
  name,
  currentChannel,
  onClick,
}) => {
  const classes = cn({
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    btn: true,
    'btn-secondary': id === currentChannel,
  });

  return (
    <li className="nav-item w-100">
      <button type="button" className={classes} onClick={onClick}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default Channel;
