export const FIELD_TYPE_TEXT = 'text';
export const FIELD_TYPE_NUMBER = 'number';
export const FIELD_TYPE_CHECKBOX = 'checkbox';
export const FIELD_TYPE_RADIO = 'radio';
export const FIELD_TYPE_DROPDOWN = 'dropdown';

export type Tier = {
  min: number,
  max: number,
  price: number
};

export type Product = {
  label: string,
  price: number,
  type: 'product',
  name: string,
  defaultCount?: number,
  tiers?: Array<Tier>,
  properties?: Array<Property>
};

export type Property = {
  type: 'text' | 'number' | 'checkbox' | 'radio' | 'dropdown',
  label: string,
  enabled: boolean,
  price: number,
  name: string,
  placeholder?: string
};

interface PropertyWithTiers extends Property{
  tiers?: Array<Tier>
}

export interface PropertyText extends PropertyWithTiers {

}

export interface PropertyNumber extends PropertyWithTiers {
  min?: number,
  max?: number,
  step?: number,
}

export interface PropertyCheckbox extends PropertyWithTiers {

}

export interface PropertyRadio extends Property {
  options?: Array<Option>
}

export interface PropertyDropdown extends Property {
  options?: Array<Option>
}

export type Option = {
  label: string,
  value: number | string,
  tiers?: Array<Tier>
};