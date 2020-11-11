import React, { useState } from 'react';
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import {Option} from "../../utils/models/models";

type Props = {
  name: string,
  label: string,
  value: number | string,
  options: Array<Option>,
  sizeLabel?: number,
  sizeField?: number,
  onChange: ((val: any) => void)
};

export const RadioField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (value: any) => {
    setValue(value);
    props.onChange && props.onChange(value)
  };

  const options = props.options.map((item, index) => {
    return (
      <ToggleButton key={index} value={item.value}>{item.label}</ToggleButton>
    );
  });

  return (
    <Form.Group as={Row} controlId={props.name}>
      <Form.Label column sm={props.sizeLabel}>{props.label}</Form.Label>
      <Col sm={props.sizeField}>
        <ToggleButtonGroup type="radio" onChange={handleChange} name="options" defaultValue={value}>
          {options}
        </ToggleButtonGroup>
      </Col>
    </Form.Group>
  );
}

RadioField.defaultProps = {
  sizeLabel: 2,
  sizeField: 10,
  options: []
};