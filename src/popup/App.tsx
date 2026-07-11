import { MessageType, type SearchMessage, type NextResult, type PreviousResult } from '../shared/messages/messages'
import { useState, type SubmitEvent } from 'react'
import { sendMessage } from './messaging'
import './App.css'
import {type SearchOptions, DEFAULT_SEARCH_OPTIONS } from '../shared/messages/search'

async function searchMessage(query: string, options: SearchOptions) {
  await sendMessage({
    type: MessageType.SEARCH,
    query,
    options
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
  const [options, setOptions] = useState<SearchOptions>(DEFAULT_SEARCH_OPTIONS)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    searchMessage(input, options)
  }

  function updateSearchOption(property: keyof SearchOptions, value: boolean) {
    setOptions((prevOption) => ({
      ...prevOption,
      [property]: value
    }))
  }
  
  return (
    <main style={{ padding: 16, width: 320 }}>
      <h1>Searchy</h1>

      <p>Browser extension loaded successfully.</p>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)}/>
        <label>
          <input
            type='checkbox'
            checked={options.caseSensitive}
            onChange={e => updateSearchOption('caseSensitive', e.target.checked)}
            />
            Case Sensitive
        </label>
        <label>
          <input
            type='checkbox'
            checked={options.wholeWord}
            onChange={e => updateSearchOption('wholeWord', e.target.checked)}
            />
            Whole Word
        </label>
        <label>
          <input
            type='checkbox'
            checked={options.regex}
            onChange={e => updateSearchOption('regex', e.target.checked)}
            />
            Regex
        </label>
        <button type='submit'>Search</button>
      </form>
      <button onClick={nextMessage}>Next</button>
      <button onClick={prevMessage}>Previous</button>
    </main>
  )
}

export default App