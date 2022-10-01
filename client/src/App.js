import React, { useEffect, useState} from 'react'
import Login from './components/Login';
import Signup from './components/Signup';
import Chats from './components/Chats';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [backendData, setBD] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBD(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof backendData.users === "undefined") ? (
        <p>loading...</p>
      ): (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
      <h1> Facebook </h1>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/chats" element={<Chats />} />
      </Routes>
    </div>
  )
}

export default App
