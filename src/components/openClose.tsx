import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import uniqueId from 'lodash/uniqueId';

type Props = {
  btnTitle: string,
  children: React.ReactNode
};

export function OpenClose(props: Props) {
  const [open, setOpen] = useState(false);

  const id = uniqueId();

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant="secondary"
        size="sm"
        block
        aria-controls={id}
        aria-expanded={open}
      >
        {props.btnTitle}
      </Button>
      <Collapse in={open}>
        <div id={id}>
          {props.children}
        </div>
      </Collapse>
      <hr />
    </>
  );
}