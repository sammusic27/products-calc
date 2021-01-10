import {
    Product,
    FIELD_TYPE_TEXT,
    PropertyText,
    FIELD_TYPE_NUMBER,
    Property,
    PropertyNumber,
    Tier,
    FIELD_TYPE_CHECKBOX,
    PropertyCheckbox,
    PropertyRadio, Option, FIELD_TYPE_RADIO, FIELD_TYPE_DROPDOWN, PropertyDropdown
} from "./models/models";
import uniqueId from "lodash/uniqueId";


export function parseProductList (products: Array<any> = []): Array<Product> {
    return products.map(parseProduct);
}

export function parseProduct(obj: any): Product {
    const product: Product = {
        _id: obj._id || uniqueId('id'),
        label: obj.label,
        price: obj.price,
        type: 'product',
        name: uniqueId('product')
    };

    if(obj.defaultCount){
        product.defaultCount = obj.defaultCount;
    }

    if(obj.tiers){
        product.tiers = obj.tiers;
    }

    if(obj.properties){
        product.properties = obj.properties.map(parseProperty);
    }

    return product;
}

function parseProperty(obj: any){
    const property: Property = {
        label: obj.label,
        price: obj.price || 0,
        type: obj.type,
        name: uniqueId('property')
    };

    if(obj.placeholder) {
        property.placeholder = obj.placeholder;
    }

    switch(property.type){
        case FIELD_TYPE_TEXT: return parseInputText(property, obj);
        case FIELD_TYPE_NUMBER: return parseInputNumber(property, obj);
        case FIELD_TYPE_CHECKBOX: return parseCheckbox(property, obj);
        case FIELD_TYPE_RADIO: return parseRadio(property, obj);
        case FIELD_TYPE_DROPDOWN: return parseDropdown(property, obj);
    }

    return property;
}

function parseInputText(property: PropertyText, obj: any): PropertyText{
    if(obj.tiers) {
        property.tiers = obj.tiers.map(parseTiers);
    }

    return property;
}

function parseInputNumber(property: PropertyNumber, obj: any): PropertyNumber{
    if(obj.tiers) {
        property.tiers = obj.tiers.map(parseTiers);
    }

    if(obj.min) {
        property.min = obj.min;
    }

    if(obj.max) {
        property.max = obj.max;
    }

    if(obj.step) {
        property.step = obj.step;
    }

    return property;
}

function parseCheckbox(property: PropertyCheckbox, obj: any): PropertyCheckbox{

    return property;
}

function parseRadio(property: PropertyRadio, obj: any): PropertyRadio{
    property.options = obj.options.map(parseOption);

    return property;
}

function parseDropdown(property: PropertyDropdown, obj: any): PropertyDropdown{
    property.options = obj.options.map(parseOption);

    return property;
}

function parseTiers(obj: any): Tier{
    const tier: Tier = {
        min: obj.min,
        max: obj.max,
        price: obj.price
    };

    return tier;
}

function parseOption(obj: any): Option{
    const option: Option = {
        label: obj.label,
        value: obj.value,
    };

    if(obj.tiers){
        option.tiers = obj.tiers.map(parseTiers);
    }

    return option;
}