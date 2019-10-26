import React from 'react';
import PropTypes from 'prop-types';

import { MdInfoOutline } from 'react-icons/md';

import { Modall, ContentModal, Actions, Front } from './styles';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <Front>
        <Modall id="modal">
          <h3>Atenção!</h3>
          <ContentModal>
            <MdInfoOutline style={{ marginRight: 24 }} size={30} color="#222" />
            {this.props.children} {this.props.nameDelete.time}
          </ContentModal>
          <Actions>
            <button className="toggle-button" onClick={this.onClose}>
              Não
            </button>
            <button className="toggle-button" onClick={this.props.onDelete}>
              Sim, {this.props.nomeButton}!
            </button>
          </Actions>
        </Modall>
      </Front>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
