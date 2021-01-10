import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  type: 'warning' | 'danger' | 'success',
  message: string
};

export function Message(props: Props){
  const type = props.type;
  const cmp = props.message ? (
    <Alert variant={type}>
      {props.message}
    </Alert>
  ) : null;

  return (cmp);
}

Message.defaultProps = {
  type: 'danger',
  message: ''
};