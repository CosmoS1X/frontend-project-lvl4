import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import * as actions from '../../actions';

const Channel = ({
  id, name, removable, currentChannel, onChangeChannel, showModal,
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
              <Dropdown.Item href="#" onClick={() => showModal({ modalName: 'removing', id })}>
                Удалить
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => showModal({ modalName: 'renaming', id })}>
                Переименовать
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </li>
  );
};

export default connect(null, actions)(Channel);