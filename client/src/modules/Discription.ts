const DISCRIPTION = "Discription/DISCRIPTION" as const;

export type DiscriptionState = {
  text: string;
};

type DiscriptionAction = ReturnType<typeof discription>;

export const discription = (text: string) => ({
  type: DISCRIPTION,
  payload: text,
});

const initialState: DiscriptionState = {
  text: "",
};

const makeDiscription = (state = initialState, action: DiscriptionAction) => {
  switch (action.type) {
    case DISCRIPTION:
      return { text: action.payload };
    default:
      return state;
  }
};

export default makeDiscription;
