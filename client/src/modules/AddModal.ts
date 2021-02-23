const PRIVATE_MODAL = "AddModal/PRIVATE_MODAL" as const;
const PUBLIC_MODAL = "AddModal/PUBLIC_MODAL" as const;

type PrivateState = {
  isPrivate: string;
};

type AddModalAction =
  | ReturnType<typeof privateModal>
  | ReturnType<typeof publicModal>;

export const privateModal = () => ({
  type: PRIVATE_MODAL,
});
export const publicModal = () => ({
  type: PUBLIC_MODAL,
});

const initialState: PrivateState = {
  isPrivate: "",
};

const checkAddModal = (state = initialState, action: AddModalAction) => {
  switch (action.type) {
    case PRIVATE_MODAL:
      return { isPrivate: "Private" };
    case PUBLIC_MODAL:
      return { isPrivate: "Public" };
    default:
      return state;
  }
};
export default checkAddModal;
