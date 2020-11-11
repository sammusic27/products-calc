export const products = [
  {
    label: 'Визитка',
    type: 'product',
    price: 30,
    defaultCount: 2,
    tiers: [
      {min: 1, max: 100, price: 30},
      {min: 101, max: 200, price: 27},
    ],
    properties: [
      {
        label: 'Ламинация',
        type: 'radio',
        options: [
          {
            label: 'С одной стороны', value: 30,
            tiers: [
              {min: 1, max: 50, price: 30},
              {min: 51, max: 100, price: 27},
              {min: 101, max: 200, price: 25},
            ]
          },
          {label: 'С двух сторон', value: 50}
        ],
      },
      {
        label: 'Скругление углов',
        type: 'checkbox',
        price: 10
      },
      {
        label: 'Дизайн',
        type: 'dropdown',
        options: [
          {label: 'Монохромный', value: 100},
          {label: 'Цветной', value: 200},
        ]
      }
    ],
  },
  {
    label: 'Люверсы',
    type: 'product',
    price: 10,
    defaultCount: 4,
    tiers: [
      {min: 1, max: 100, price: 30},
      {min: 101, max: 200, price: 27},
    ],
  }
];