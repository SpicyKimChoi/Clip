const PRIVATE_ADD = "PrivateClip/PRIVATE_ADD" as const;
const PRIVATE_EDIT = "PrivateClip/PRIVATE_EDIT" as const;
const PRIVATE_DELETE = "PrivateClip/PRIVATE_DELETE" as const;

export type Input = {
  id: number;
  title: string;
  url: string;
  discription: string;
};
type ClipAction = ReturnType<typeof addClip> | ReturnType<typeof deleteClip>;
type ClipState = Input[];

export const addClip = (input: Input) => ({
  type: PRIVATE_ADD,
  payload: input,
});
export const deleteClip = (id: number) => ({
  type: PRIVATE_DELETE,
  payload: id,
});

const initialStae: ClipState = [];
const privateClip = (state = initialStae, action: ClipAction) => {
  switch (action.type) {
    case PRIVATE_ADD:
      let nextId = 0;
      if (state.length === 0) {
        nextId = 1;
      } else {
        nextId = Math.max(...state.map((clip) => clip.id)) + 1;
      }

      return state.concat({
        id: nextId,
        title: action.payload.title,
        url: action.payload.url,
        discription: action.payload.discription,
      });
    case PRIVATE_DELETE:
      return state.filter((clip) => clip.id !== action.payload);

    default:
      return state;
  }
};

export default privateClip;
