import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

type Props = {
  name: string,
  label: string,
  type: string,
  isEnabledInputGroup: boolean,
  inputGroupLabel: string,
  value: number | string,
  sizeLabel?: number,
  sizeField?: number,
  onChange: ((val: any) => void)
};

export const InputField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e.target.value)
  };

  const toDisplayInputGroup = () => {
    const tag = (
      <InputGroup.Prepend>
        <InputGroup.Text>{props.inputGroupLabel}</InputGroup.Text>
      </InputGroup.Prepend>
    );

    return props.isEnabledInputGroup ? ({tag}) : null;
  }

  return (
    <Form.Group as={Row} controlId={props.name}>
      <Form.Label column sm={props.sizeLabel}>{props.label}</Form.Label>
      <Col sm={props.sizeField}>
        <InputGroup>
          <Form.Control
              type={props.type}
              onChange={handleChange}
              value={value}
          />
          {toDisplayInputGroup()}
        </InputGroup>
      </Col>
    </Form.Group>
  );
}

InputField.defaultProps = {
  sizeLabel: 2,
  sizeField: 10,
  isEnabledInputGroup: false,
  inputGroupLabel: ''
};