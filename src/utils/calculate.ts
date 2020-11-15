import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import {Product} from "./models/models";

export function calcForm(product: Product, count: number, values: any){
  const data = cloneDeep(values);

  let price = 0;
  forEach(data, (item, key) => {

    let priceProperty = product.price * count;
    if(product.properties){
      const field: any = product.properties.find(i => i.name === key);
      if(field.type === 'checkbox'){
        priceProperty = item === true ? parseFloat(field.price) : 0;
      } else {
        priceProperty = parseFloat(item);
      }
    }

    price = price + priceProperty * count;
  });

  return price;
}