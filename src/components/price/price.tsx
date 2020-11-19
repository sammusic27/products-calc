import React from 'react';

import './price.scss';

type Props = {
  size?: undefined | 'sm' | 'lg' | 'xl',
  price: number
};

export function Price(props: Props){
  const value = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'UAH' }).format(props.price);

  let className = 'price-value';
  switch(props.size){
    case 'sm': className = 'price-value-sm'; break;
    case 'lg': className = 'price-value-lg'; break;
    case 'xl': className = 'price-value-xl'; break;
  }

  return (<span className={className}>{value}</span>);
}

Price.defaultProps = {
  size: undefined
};