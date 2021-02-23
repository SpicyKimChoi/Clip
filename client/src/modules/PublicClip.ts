const PUBLIC_ADD = "PublicClip/PUBLIC_ADD" as const;
const PUBLIC_EDIT = "PublicClip/PUBLIC_EDIT" as const;
const PUBLIC_DELETE = "PublicClip/PUBLIC_DELETE" as const;
const PUBLIC_CHANGE = "PublicClip/PUBLIC_CHANGE" as const;
export type Input = {
  id: number;
  title: string;
  url: string;
  discription: string;
};
type ClipAction =
  | ReturnType<typeof addClip>
  | ReturnType<typeof deleteClip>
  | ReturnType<typeof editClip>
  | ReturnType<typeof changeClip>;

type ClipState = Input[];

export const addClip = (input: Input) => ({
  type: PUBLIC_ADD,
  payload: input,
});
export const deleteClip = (id: number) => ({
  type: PUBLIC_DELETE,
  payload: id,
});
export const editClip = (input: Input) => ({
  type: PUBLIC_EDIT,
  payload: input,
});
export const changeClip = (arr: Input[]) => ({
  type: PUBLIC_CHANGE,
  payload: arr,
});

const initialStae: ClipState = [
  {
    id: 1,
    title: "p_test!",
    url: "www.p_test.com",
    discription: "string",
  },
  {
    id: 2,
    title: "p_test2",
    url: "www.p_test2.com",
    discription: "string",
  },
  {
    id: 3,
    title: "p_test3",
    url: "www.p_test3.com",
    discription: "string",
  },
  {
    id: 4,
    title: "p_test4",
    url: "www.p_test4.com",
    discription: "string",
  },
  {
    id: 5,
    title: "p_test5",
    url: "www.p_test5.com",
    discription: "string",
  },
];
const publicClip = (state: ClipState = initialStae, action: ClipAction) => {
  switch (action.type) {
    case PUBLIC_ADD:
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
    case PUBLIC_DELETE:
      return state.filter((clip) => clip.id !== action.payload);
    case PUBLIC_EDIT:
      return state.map((clip) => {
        if (clip.id === action.payload.id) {
          clip.title = action.payload.title;
          clip.url = action.payload.url;
          clip.discription = action.payload.discription;
        }
        return clip;
      });
    case PUBLIC_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

export default publicClip;
