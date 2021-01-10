import { show as showModal, hide as hideModal} from '../reducers/modal';

export const show = (name: string, props = {}) => async (dispatch: any) => {
  dispatch(showModal({
    name,
    props
  }));
}

export const hide = (name: string, props = {}) => async (dispatch: any) => {
  dispatch(hideModal());
}

export const actions = {
  show,
  hide,
};