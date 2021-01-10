export type ROW_TYPE = {
  rows: Array<any>,
  loading: boolean,
  error: string
};

export const stateRows: ROW_TYPE = {
  rows: [],
  loading: false,
  error: ''
};

export type DATA_TYPE = {
  data: any,
  loading: boolean,
  error: string
};

export const stateDATA: DATA_TYPE = {
  data: {},
  loading: false,
  error: ''
};

export const rowsActions = {
  pending: (state: any) => {
    return {
      ...state,
      loading: true
    };
  },
  failure: (state: any, action: any) => {
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  },
  completed: (state: any, action: any) => {
    return {
      ...state,
      loading: false,
      error: '',
      rows: action.payload,
    };
  },
};

export const singleActions = {
  pending: (state: any) => {
    return {
      ...state,
      loading: true
    };
  },
  failure: (state: any, action: any) => {
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  },
  completed: (state: any, action: any) => {
    return {
      ...state,
      loading: false,
      error: '',
      data: action.payload,
    };
  },
};
