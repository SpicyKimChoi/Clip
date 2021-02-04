const URL = "url/URL" as const;

export type urlState = {
  text: string;
};

type urlAction = ReturnType<typeof url>;

export const url = (text: string) => ({
  type: URL,
  payload: text,
});

const initialState: urlState = {
  text: "",
};

const makeurl = (state = initialState, action: urlAction) => {
  switch (action.type) {
    case URL:
      return { text: action.payload };
    default:
      return state;
  }
};

export default makeurl;
