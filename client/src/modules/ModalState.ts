const MODALOPEN = "ModalState/MODALOPEN" as const;
const MODALCLOSE = "ModalState/MODALCLOSE" as const;

type ModalState = {
  isOpen: boolean;
};

type ModalAction = ReturnType<typeof modalOpen> | ReturnType<typeof modalClose>;

export const modalOpen = () => ({
  type: MODALOPEN,
});
export const modalClose = () => ({
  type: MODALCLOSE,
});

const initialState: ModalState = {
  isOpen: false,
};
const checkModal = (state: ModalState = initialState, action: ModalAction) => {
  switch (action.type) {
    case MODALOPEN:
      return { isOpen: true };
    case MODALCLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};

export default checkModal;
