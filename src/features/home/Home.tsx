import React, { FC } from "react";
import Notebooks from '../notebook/Notebooks'
import Editor from "../note/Editor";
import './Home.css'

const Home: FC = () => {
  return (
    <div className="home">
      <div className="row">
        <div className="col-lg-4 notebooks-container">
          <Notebooks />
        </div>
        <div className="col-lg-8 editor-container">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Home;