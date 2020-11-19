import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

type Props = {
  name: string,
  label?: string,
  value?: number | string,
  id?: undefined | string,
  labelFor?: undefined | string,
  size: undefined | 'sm' | 'lg',
  smLabel?: number,
  smField?: number,
  onChange?: ((val: any) => void)
};

export const CheckboxField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (e: any) => {
    setValue(e.target.checked);
    props.onChange && props.onChange(e.target.checked)
  };

  const showLabel = () => {
    if(props.label){
      return <Form.Label
                column={props.size}
                sm={props.smLabel}
                htmlFor={props.labelFor}
              >
                {props.label}
              </Form.Label>;
    }
    return null;
  }

  return (
    <Form.Group as={Row}>
      {showLabel()}
      <Col sm={props.smField}>
        <Form.Check
          onChange={handleChange}
          type="checkbox"
          className="checkbox-holder"
          name={props.name}
          checked={!!value}
          id={props.id}
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