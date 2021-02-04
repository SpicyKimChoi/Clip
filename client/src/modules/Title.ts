const TITLE = "Title/TITLE" as const;

export type TitleState = {
  text: string;
};

type TitleAction = ReturnType<typeof title>;

export const title = (text: string) => ({
  type: TITLE,
  payload: text,
});

const initialState: TitleState = {
  text: "",
};

const makeTitle = (state = initialState, action: TitleAction) => {
  switch (action.type) {
    case TITLE:
      return { text: action.payload };
    default:
      return state;
  }
};

export default makeTitle;
