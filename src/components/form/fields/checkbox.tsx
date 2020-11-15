import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

type Props = {
  name: string,
  label: string,
  value: number | string,
  sizeLabel?: number,
  sizeField?: number,
  onChange: ((val: any) => void)
};

export const CheckboxField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (e: any) => {
    setValue(e.target.checked);
    props.onChange && props.onChange(e.target.checked)
  };

  return (
    <Form.Group as={Row} controlId={props.name}>
      <Form.Label column sm={props.sizeLabel}>{props.label}</Form.Label>
      <Col sm={props.sizeField}>
        <Form.Check
          onChange={handleChange}
          type="checkbox"
          name={props.name}
          checked={value}
        />
      </Col>
    </Form.Group>
  );
}

CheckboxField.defaultProps = {
  sizeLabel: 2,
  sizeField: 10
};