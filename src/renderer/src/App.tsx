import React, { useState, useEffect } from 'react'

import electronLogo from './assets/electron.svg'

type User = {
  id: number
  name: string
  // Add other properties as needed
}

function App(): JSX.Element {
  const [name, setName] = useState('')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await window.electron.fetchUsers()
      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    // Send an IPC message to the main process with the form data
    window.electron.submitForm({ name })
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
          <h4 className="text-lg font-bold ">List of registered name:</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
