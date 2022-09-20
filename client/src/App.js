import React, { useEffect, useState} from 'react'

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
    </div>
  )
}

export default App
