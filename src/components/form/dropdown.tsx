import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import {Option} from "../../utils/models/models";

type Props = {
  name: string,
  label: string,
  value?: number | string,
  options: Array<Option>,
  sizeLabel?: number,
  sizeField?: number,
  onChange: ((val: any) => void)
};

export const DropdownField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (e: any) => {
    setValue(e.target.checked);
    props.onChange && props.onChange(e.target.value)
  };


  const options = props.options.map((item) => {
    return (
      <option key={item.value} value={item.value}>{item.label}</option>
    );
  });

  return (
    <Form.Group as={Row} controlId={props.name}>
      <Form.Label column sm={props.sizeLabel}>{props.label}</Form.Label>
      <Col sm={props.sizeField}>
        <Form.Control
            as="select"
            value={value}
            onChange={handleChange}
        >
          {options}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}

DropdownField.defaultProps = {
  sizeLabel: 2,
  sizeField: 10,
  options: []
};