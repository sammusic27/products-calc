import React from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import {actions} from "../actions";

interface Props {
  modal: any,
  hide: (name: string) => void,
}

interface ExtendProps {
  onHide: () => {},
}

const mapState = (state: Props) => ({
  modal: state.modal
})

const mapDispatch = {
  hide: (name: string) => (actions.modal.hide(name))
}

const connector = connect(mapState, mapDispatch)

const withModal = <P extends object> (Component: React.ComponentType<P>) : React.FC<P & ExtendProps>  =>  {
  const name = Component.displayName || '';

  const Cmp = function(props: Props) {
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