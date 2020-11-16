import React from 'react';

type Props = {
  tiers: Array<any>,
  count: number
};

export function TiersComponent(props: Props){
  if(props.tiers.length === 0){
    return null;
  }

  const isMaxTier = props.tiers[props.tiers.length - 1].max <= props.count;

  return (
    <ul>
      {props.tiers.map((item, index) => {
        const isCurrentTier = item.min <= props.count && item.max >= props.count;
        let className = isCurrentTier ? 'text-weight-bold' : '';
        if(isMaxTier && props.tiers.length -1 === index){
          className = 'text-weight-bold';
        }

        return <li key={item.price} className={className}>{item.min} - {item.max} : {item.price} uah</li>;
      })}
    </ul>
  );
}

TiersComponent.defaultProps = {
  tiers: [],
  count: 1
};