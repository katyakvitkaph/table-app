import React from 'react';
import PropTypes from 'prop-types';
import { ModalHeader } from 'reactstrap';
import ModalForm from './ModalForm';

const ModalBody = ({ toggle }) => {
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  const title = 'Add new user';

  return (
    <>
      <ModalHeader toggle={toggle} close={closeBtn}>
        {title}
      </ModalHeader>
      <ModalForm toggle={toggle} />
    </>
  );
};

export default ModalBody;

ModalBody.propTypes = {
  toggle: PropTypes.func.isRequired,
};
