import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

type Props = {
  name: string,
  label: string,
  labelFor?: undefined | string,
  type: string,
  isEnabledInputGroup: boolean,
  inputGroupLabel: string,
  value?: number | string,
  size: undefined | 'sm' | 'lg',
  smLabel?: number,
  smField?: number,
  onChange: ((val: any) => void)
};

export const InputField = function(props: Props) {
  const handleChange = (e: any) => {
    props.onChange(e.target.value)
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
    <Form.Group
      as={Row}
    >
      <Form.Label
        column={props.size}
        sm={props.smLabel}
        htmlFor={props.labelFor}
      >
        {props.label}
      </Form.Label>
      <Col sm={props.smField}>
        <InputGroup>
          <Form.Control
            size={props.size}
            type={props.type}
            onChange={handleChange}
            value={props.value}
          />
          {toDisplayInputGroup()}
        </InputGroup>
      </Col>
    </Form.Group>
  );
}

InputField.defaultProps = {
  size: "sm",
  smLabel: 2,
  smField: 10,
  isEnabledInputGroup: false,
  inputGroupLabel: ''
};