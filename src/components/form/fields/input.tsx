import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

type Props = {
  as?: any,
  name: string,
  label?: string,
  labelFor?: string,
  type: string,
  inline?: boolean,
  min?: number | string,
  max?: number | string,
  step?: number | string,
  placeholder?: string,
  defaultValue?: number | string,
  feedback?: string,
  error?: string,
  disabled?: boolean,
  isEnabledInputGroup: boolean,
  inputGroupLabel: string,
  value?: number | string,
  size: undefined | 'sm' | 'lg',
  smLabel?: number,
  smField?: number,
  required?: boolean,
  onChange: ((val: any) => void),
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

    return props.isEnabledInputGroup ? tag : null;
  }

  const showFeedback = () => {
    const type = props.error ? 'invalid' : 'valid';
    const message = props.error ? props.error : props.feedback;

    const cmp = (
      <Form.Control.Feedback type={type}>
        {message}
      </Form.Control.Feedback>
    );

    return message ? cmp : null;
  };

  const showInput = () => {
    return (
      <>
        <InputGroup size={props.size}>
          <Form.Control
            size={props.size}
            type={props.type}
            onChange={handleChange}
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            required={props.required}
            placeholder={props.placeholder}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            isInvalid={!!props.error}
            isValid={!!props.feedback}
          />
          {toDisplayInputGroup()}
          {showFeedback()}
        </InputGroup>
      </>
    );
  };

  const showLabel = () => {
    const label = (
      <Form.Label
        column={props.inline ? props.size : undefined}
        sm={props.inline ? props.smLabel : undefined}
        htmlFor={props.labelFor}
      >
        {props.label}
      </Form.Label>
    );

    return props.label ? label : null;
  };

  const showInline = () => {
    return (
      <Form.Group
        as={props.as || Row}
        controlId={props.name}
        key={props.name}
      >
        {showLabel()}
        <Col sm={props.smField}>
          {showInput()}
        </Col>
      </Form.Group>
    );
  }

  if(props.inline){
    return showInline();
  }

  return (
    <Form.Group
      as={props.as}
      controlId={props.name}
      key={props.name}
    >
      {showLabel()}
      {showInput()}
    </Form.Group>
  );
}

InputField.defaultProps = {
  size: "sm",
  inline: true,
  smLabel: 2,
  smField: 10,
  isEnabledInputGroup: false,
  inputGroupLabel: ''
};