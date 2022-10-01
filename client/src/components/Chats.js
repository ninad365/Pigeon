import React, { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";

export default function Chats() {
  return (
    <div className="container">
      <h1>Chats</h1>
      <Link to="/">Logout</Link>
    </div>
  )
}
