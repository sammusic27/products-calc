import React from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap';

type Props = {
  name: string,
  options: Array<any>,
  onChange: (name: string, value: any, index: number) => void,
  onRemove: (index: number) => void,
};

export class Options extends React.Component<Props>{

  static defaultProps = {
    options: []
  };

  render() {
    const { options, name } = this.props;

    return options.map((option: any, index: number) => {
      return (
        <Row key={index}>
          <Col>
            <Form.Group controlId={`${name}-option-${index}-label`}>
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Введите Название"
                onChange={(e) => this.props.onChange('label', e.target.value, index)}
                value={option.label}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`${name}-option-${index}-value`}>
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Введите Цену"
                defaultValue="0"
                onChange={(e) => this.props.onChange('value', e.target.value, index)}
                value={option.value}
              />
            </Form.Group>
          </Col>
          <Col sm={1}>
            <Form.Label>{' '}</Form.Label>
            <div>
              <Button size="sm" variant="danger" onClick={() => this.props.onRemove(index)}>X</Button>
            </div>
          </Col>
        </Row>
      );
    });
  }
}