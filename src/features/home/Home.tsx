import React, { FC } from "react";
import Notebooks from '../notebook/Notebooks'
import Editor from "../note/Editor";
import './Home.css'

const Home: FC = () => {
  return (
    <div className="home">
      <div className="row home-container">
        <div className="col-lg-3 notebooks-container border border-left-0 border-top-0 border-bottom-0 mt-1 off-white" >
          <Notebooks />
        </div>
        <div className="col-lg-7 editor-container">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Home;