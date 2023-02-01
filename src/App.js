import React from "react";
// import { firebaseConfig } from './firebase-config.js';
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";


const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  );
};

export default App;
