import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Row, Col, Form, Button} from 'react-bootstrap';

type Props = {
  name: string,
  title?: string,
  tiers: Array<any>,
  proposedPrice?: number,
  onChangeTiers: (tiers: Array<any>) => void,
};

export class TiersList extends React.Component<Props>{

  static defaultProps = {
    tiers: [],
    title: '',
    proposedPrice: 0
  };

  onAddTier = () => {
    const tiers = cloneDeep(this.props.tiers);

    const length = tiers.length;
    const min = length === 0 ? 1 : parseInt(tiers[length - 1].max) + 1;
    const max = length === 0 ? min + 1 : min + parseInt(tiers[length - 1].max) - 1;

    tiers.push({ min, max, price: 0 });

    this.props.onChangeTiers(tiers);
  }

  handleRemoveTier = (index: number) => {
    const tiers = cloneDeep(this.props.tiers);
    tiers.splice(index, 1);
    this.props.onChangeTiers(tiers);
  };

  handleChangeTier = (name: string, value: any, index: number) => {
    const tiers = cloneDeep(this.props.tiers);
    tiers[index][name] = value;
    this.props.onChangeTiers(tiers);
  };

  showAddBtn = () => {
    return (
      <div className="form-group">
        <Form.Label>&nbsp;</Form.Label>
        <div>
          <Button size="sm" variant="info" onClick={this.onAddTier}>+&nbsp;Tier</Button>
        </div>
      </div>
    );
  }

  renderTiers() {
    const {tiers, name, proposedPrice} = this.props;
    return tiers.map((tier: any, index: number) => {
      return (
        <Row key={index}>
          <Col sm={1}>
            {index === tiers.length -1 ? this.showAddBtn() : null}
          </Col>
          <Col>
            <Form.Group controlId={`${name}-tier-${index}-min`}>
              <Form.Label>Минильно</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Введите Min"
                onChange={(e) => this.handleChangeTier('min', e.target.value, index)}
                value={tier.min}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`${name}-tier-${index}-max`}>
              <Form.Label>Максимально</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Введите Max"
                defaultValue="0"
                onChange={(e) => this.handleChangeTier('max', e.target.value, index)}
                value={tier.max}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`${name}-tier-${index}-price`}>
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Введите Цену"
                defaultValue={proposedPrice}
                onChange={(e) => this.handleChangeTier('price', e.target.value, index)}
                value={tier.price}
              />
            </Form.Group>
          </Col>
          <Col sm={1}>
            <div className="form-group">
              <Form.Label>&nbsp;</Form.Label>
              <div>
                <Button size="sm" variant="danger" onClick={() => this.handleRemoveTier(index)}>X</Button>
              </div>
            </div>
          </Col>
        </Row>
      );
    });
  }

  render(){
    return (
      <>
        <h6>{this.props.title}</h6>
        {this.renderTiers()}
        {this.props.tiers.length === 0 ? this.showAddBtn() : null}
      </>
    );
  }
}