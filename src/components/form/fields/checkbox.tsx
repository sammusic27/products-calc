import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

type Props = {
  name: string,
  label?: string,
  value?: number | string,
  size: undefined | 'sm' | 'lg',
  smLabel?: number,
  smField?: number,
  onChange?: ((val: any) => void)
};

export const CheckboxField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (e: any) => {
    setValue(e.target.checked);
    props.onChange && props.onChange(e.target.checked)
  };

  const showLabel = () => {
    if(props.label){
      return <Form.Label
                column={props.size}
                sm={props.smLabel}
              >
                {props.label}
              </Form.Label>;
    }
    return null;
  }

  return (
    <Form.Group as={Row} controlId={props.name}>
      {showLabel()}
      <Col sm={props.smField}>
        <Form.Check
          onChange={handleChange}
          type="checkbox"
          className="checkbox-holder"
          name={props.name}
          checked={!!value}
        />
      </Col>
    </Form.Group>
  );
}

CheckboxField.defaultProps = {
  size: "sm",
  smLabel: 2,
  smField: 10,
};