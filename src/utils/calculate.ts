import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import {Product, Tier} from "./models/models";

export function calcForm(product: Product, count: number, values: any){
  const data = cloneDeep(values);

  let price = getProductPrice(product, count) * count;
  forEach(data, (item, key) => {

    let priceProperty = 0;
    if(product.properties){
      const property = product.properties.find(i => i.name === key);
      priceProperty = getPriceFromPropertyByParameters(property, values[key], count);
    }

    price = price + priceProperty * count;
  });

  return price;
}

export function getProductPrice(product: Product, count: number){
  let result = product.price;

  if(product.tiers){
    result = getTierByPrice(product.tiers, count);
  }

  return result;
}

export function getPriceFromPropertyByParameters(property: any, value: any = null, count: number = 1){
  let price = 0;

  if(!property){
    return price;
  }

  switch(property.type){
    case 'radio':
    case 'dropdown':
      const option = findOption(property.options, value);
      if(option){
        if(option.tiers){
          price = getTierByPrice(option.tiers, count);
        } else {
          price = option.value;
        }
      }
      break;
    case 'text':
    case 'number':
    case 'checkbox':
      if(value){
        if(property.tiers){
          price = getTierByPrice(property.tiers, count);
        } else {
          price = property.price;
        }
      }
      break;
  }

  return price;
}

function findOption(options: any, value: any){
  return options.find((item: any) => parseFloat(item.value) === parseFloat(value));
}

export function getTiersFromPropertyByValue(property: any, value: any){
  if(property.options){
    const option = property.options.find((i: any) => {
      if(i.value === value){
        return true;
      }

      if(i.tiers){
        return i.tiers.find((j: any) => j.price === value);
      }
      return false;
    });

    return option && option.tiers ? option.tiers : [];
  } else {
    return property.tiers || [];
  }
}

export function getTierByPrice(tiers: Array<Tier>, count: number) : number{
  let result: number = 0;

  const found = tiers.find(item => item.min <= count && item.max >= count);

  if(!found){
    if(tiers[tiers.length - 1].max < count){
      result = tiers[tiers.length - 1].price;
    }
  } else {
    result = found.price;
  }

  return result;
}