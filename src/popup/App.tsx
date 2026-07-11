import { MessageType, type SearchMessage, type NextResult, type PreviousResult } from '../shared/messages'
import { useState, type SubmitEvent } from 'react'
import { sendMessage } from './messaging'
import './App.css'

async function searchMessage(query: string) {
  await sendMessage({
    type: MessageType.SEARCH,
    query
  } satisfies SearchMessage)
}

async function nextMessage() {
  await sendMessage({
    type: MessageType.NEXT_RESULT
  } satisfies NextResult)
}

async function prevMessage() {
  await sendMessage({
    type: MessageType.PREVIOUS_RESULT
  } satisfies PreviousResult)
}

function App() {

  const [input, setInput] = useState("")

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    searchMessage(input)
  }
  
  return (
    <main style={{ padding: 16, width: 320 }}>
      <h1>Searchy</h1>

      <p>Browser extension loaded successfully.</p>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)}/>
        <button type='submit'>Search</button>
      </form>
      <button onClick={nextMessage}>Next</button>
      <button onClick={prevMessage}>Previous</button>
    </main>
  )
}

export default App