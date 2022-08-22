import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import Apods from "./Apods";
import Apod from "./Apod";
import NoMatch from "./NoMatch";

function App() {
  const [apods, setApods] = useState([]);
  const navigate = useNavigate();
  const [userSelect, setUserSelect] = useState()
  const [apod, setApod] = useState()

  async function selectUser(user) {
    console.log(user);
    const {id} = user;
    const response = await fetch(`https://sinatra-react-project-v2.herokuapp.com/users/${id}/apods`);
    const json = await response.json();
    console.log(json);
    setApods(json);
    setUserSelect(user);
    // setApods(user.apods);
    navigate("/apods");
  };

  function imageClick(apod) {
    setApod(apod);
    navigate("/apod");
  }

  return (
    <>
      <h1 className="header">NASA Astronomy Pictures of Your Birth Day</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users selectUser={selectUser} />} />
        <Route path="/apods" element={<Apods apods={apods} user={userSelect} imageClick={imageClick} />} />
        <Route path="/apod" element={<Apod apod={apod} user={userSelect} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App;
