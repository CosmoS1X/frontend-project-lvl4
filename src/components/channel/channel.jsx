import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const Channel = ({
  id, name, removable, currentChannel, onChangeChannel,
}) => {
  const buttonVariant = id === currentChannel ? 'secondary' : 'light';

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={buttonVariant}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={onChangeChannel}
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        {removable && (
          <>
            <Dropdown.Toggle split variant={buttonVariant} className="flex-grow-0" />

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => console.log('remove modal')}>
                Удалить
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => console.log('rename modal')}>
                Переименовать
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </li>
  );
};

export default Channel;
