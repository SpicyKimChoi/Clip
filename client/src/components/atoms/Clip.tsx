import React from "react";
import usePrivateClip from "../../hooks/usePrivateClip";

type Clipinput = {
  id: number;
  title: string;
  url: string;
  discription: string;
};

const Clip = ({ id, title, url, discription }: Clipinput) => {
  const { deletePrivateClip } = usePrivateClip();

  return (
    <div>
      <div>{title}</div>
      <div>{url}</div>
      <div>{discription}</div>
      <button>edit</button>
      <button onClick={() => deletePrivateClip(id)}>delete</button>
    </div>
  );
};

export default Clip;
