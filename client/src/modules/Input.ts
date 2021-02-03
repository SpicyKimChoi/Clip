const INPUT = "Input/INPUT" as const;
const RESET = "Input/RESET" as const;

export type InputState = {
  id: number;
  title: string;
  url: string;
  discription: string;
};
type InputArray = InputState[];

type InputAction = ReturnType<typeof input> | ReturnType<typeof reset>;

export const input = ({ id, title, url, discription }: InputState) => ({
  type: INPUT,
  payload: { id, title, url, discription },
});
export const reset = () => ({
  type: RESET,
});

const initialState: InputArray = [
  {
    id: 0,
    title: "",
    url: "",
    discription: "",
  },
];

const makeInput = (state = initialState, action: InputAction) => {
  switch (action.type) {
    case INPUT:
      const nextId = Math.max(...state.map((input) => input.id)) + 1;
      return state.concat({
        id: nextId,
        title: action.payload.title,
        url: action.payload.url,
        discription: action.payload.discription,
      });
    case RESET:
      return state;
    default:
      return state;
  }
};

export default makeInput;
