import React, { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="container">
      <h1>Signup</h1>
      <Link to="/">Login</Link>
    </div>
  )
}
