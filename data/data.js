export const products = [
  {
    label: 'Визитка',
    type: 'product',
    price: 5,
    defaultCount: 100,
    tiers: [
      {min: 1, max: 100, price: 5},
      {min: 101, max: 200, price: 4},
      {min: 201, max: 300, price: 3},
      {min: 301, max: 400, price: 2},
    ],
    properties: [
      {
        label: 'Ламинация',
        type: 'dropdown',
        options: [
          {
            label: 'Глянец 1+0', value: 5,
            tiers: [
              {min: 1, max: 50, price: 5},
              {min: 51, max: 100, price: 4},
              {min: 101, max: 200, price: 3},
            ]
          },
          {
            label: 'Глянец 1+1', value: 9
          },
          {
            label: 'Мат 1+0', value: 7
          },
          {
            label: 'Мат 1+1', value: 11
          },
          {
            label: 'Глянец Плотная 1+1', value: 14
          },
          {
            label: 'Мат Плотная 1+1', value: 18
          },
        ],
      },
      {
        label: 'Скругление',
        type: 'checkbox',
        price: 10
      },
      {
        label: 'Цветность',
        type: 'radio',
        options: [
          {label: '4+0', value: 35},
          {label: '4+4', value: 55},
        ]
      }
    ],
  },
  {
    label: 'Листовки 100x70',
    type: 'product',
    price: 0.65,
    defaultCount: 50,
    properties: [
      {
        label: 'Плотность бумаги',
        type: 'dropdown',
        options: [
          {label: '115m', value: 0.1},
          {label: '130m', value: 0.2},
          {label: '150m', value: 0.3},
          {label: '170m', value: 0.4},
          {label: '200m', value: 0.5},
          {label: '250m', value: 0.6},
          {label: '350m', value: 0.8},
        ]
      }
    ]
  },
  {
    label: 'Листовки A6',
    type: 'product',
    price: 0.85,
    defaultCount: 50,
    properties: [
      {
        label: 'Плотность бумаги',
        type: 'dropdown',
        options: [
          {label: '115m', value: 0.1},
          {label: '130m', value: 0.2},
          {label: '150m', value: 0.3},
          {label: '170m', value: 0.4},
          {label: '200m', value: 0.5},
          {label: '250m', value: 0.6},
          {label: '350m', value: 0.8},
        ]
      }
    ]
  },
  {
    label: 'Листовки A5',
    type: 'product',
    price: 0.95,
    defaultCount: 50,
    properties: [
      {
        label: 'Плотность бумаги',
        type: 'dropdown',
        options: [
          {label: '115m', value: 0.1},
          {label: '130m', value: 0.2},
          {label: '150m', value: 0.3},
          {label: '170m', value: 0.4},
          {label: '200m', value: 0.5},
          {label: '250m', value: 0.6},
          {label: '350m', value: 0.8},
        ]
      }
    ]
  },
  {
    label: 'Листовки A4',
    type: 'product',
    price: 1.15,
    defaultCount: 50,
    properties: [
      {
        label: 'Плотность бумаги',
        type: 'dropdown',
        options: [
          {label: '115m', value: 0.1},
          {label: '130m', value: 0.2},
          {label: '150m', value: 0.3},
          {label: '170m', value: 0.4},
          {label: '200m', value: 0.5},
          {label: '250m', value: 0.6},
          {label: '350m', value: 0.8},
        ]
      }
    ]
  },
  {
    label: 'Листовки A3',
    type: 'product',
    price: 2.25,
    defaultCount: 50,
    properties: [
      {
        label: 'Плотность бумаги',
        type: 'dropdown',
        options: [
          {label: '115m', value: 0.1},
          {label: '130m', value: 0.2},
          {label: '150m', value: 0.3},
          {label: '170m', value: 0.4},
          {label: '200m', value: 0.5},
          {label: '250m', value: 0.6},
          {label: '350m', value: 0.8},
        ]
      }
    ]
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