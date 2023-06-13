import { trpc } from "../utils/trpc";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [input, setInput] = useState("");

  console.log("I'm loading!!!");

  const { mutate } = trpc.profile.test.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <>
      <input
        type="text"
        name="myInput"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          mutate({
            content: input,
            userId: "hello",
          });
        }}
      >
        Post
      </button>
    </>
  );
};

export default Home;
