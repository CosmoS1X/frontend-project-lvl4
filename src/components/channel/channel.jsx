import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';

const Channel = ({
  id, name, removable, currentChannel, onChangeChannel,
}) => {
  const { t } = useTranslation();
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const buttonVariant = id === currentChannel ? 'secondary' : 'light';

  const handleShowModal = (type) => {
    dispatch(actions.showModal({ type, extraData: { channelId: id } }));
    buttonRef.current.blur();
  };

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
              <Dropdown.Item href="#" onClick={() => handleShowModal('remove')}>
                {t('buttons.delete')}
              </Dropdown.Item>
              <Dropdown.Item href="#" ref={buttonRef} onClick={() => handleShowModal('rename')}>
                {t('buttons.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </li>
  );
};

export default Channel;
