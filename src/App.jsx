import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="header">
        <h1>Prince Akpobasa's Reddit Client</h1>
        <p>Welcome! We're about to build something awesome 🚀</p>
      </header>
      <main>
        <p>Your Reddit app is running locally!</p>
        <button onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </main>
    </div>
  )
}

export default App