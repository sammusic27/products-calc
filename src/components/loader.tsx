import React from 'react';
import { Spinner } from 'react-bootstrap';

type Props = {
  loading: boolean,
  children?: React.ReactNode
};

export function Loader(props: Props){
  const showLoader = props.children ? (
    <Spinner animation="border" role="status">
      {props.children}
    </Spinner>
  ) : (
    <Spinner animation="border" role="status" />
  );
  const cmp = props.loading ? showLoader : null;

  return (cmp);
}

Loader.defaultProps = {
  loading: false
};