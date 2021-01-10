import React from 'react';
import { connect } from 'react-redux';
import {actions} from "../actions";

const mapState = (state) => ({
  modal: state.modal
})

const mapDispatch = {
  hide: (name) => (actions.modal.hide(name))
}

const connector = connect(mapState, mapDispatch)

const withModal = (Component)  =>  {
  const name = Component.displayName || '';

  const Cmp = function(props) {
    const handleHide = () => {
      props.hide(name);
    };

    return <Component
      onHide={handleHide}
      values={props.modal.values}
      show={props.modal.name === name}

    />;
  }

  return connector(Cmp);
}

export {
  withModal
};