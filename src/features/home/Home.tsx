import React, { FC } from "react";
import Notebooks from '../notebook/Notebooks'
import Editor from "../note/Editor";

const Home: FC = () => {
  return (
    <div>
      <div>
        <div>
          <Notebooks />
        </div>
        <div>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Home;