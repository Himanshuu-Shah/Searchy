import { useState, type SubmitEvent } from "react"
import "./App.css"
import { AlgorithmSelector } from "./components/algorithmSelector"
import {
	DEFAULT_POPUP_SEARCH_STATE,
	type SearchState,
} from "./state/searchState"
import type { SearchAlgorithms } from "./state/algorithms"
import {
	sendSearchMessage,
	sendNextMessage,
	sendPrevMessage,
} from "./sendMessage"
import { buildSearchConfig } from "./build/buildSearchConfig"
import { AlgorithmOptions } from "./components/algorithmOptions"
import { buildCurrentSearch } from "./build/buildCurrentSearch"

function App() {
	const [input, setInput] = useState("")

	const [searchState, setSearchState] = useState<SearchState>(
		DEFAULT_POPUP_SEARCH_STATE
	)

	function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
		e.preventDefault()
		sendSearchMessage(input, buildSearchConfig(searchState))
	}

	function changeAlgorithm(algorithm: SearchAlgorithms): void {
		setSearchState((prev) => ({
			...prev,
			currentAlgorithm: algorithm,
		}))
	}

	const currentState = buildCurrentSearch(
		buildSearchConfig(searchState),
		setSearchState
	)

	console.log(currentState)

	return (
		<main style={{ padding: 16, width: 320 }}>
			<h1>Searchy</h1>

			<p>Browser extension loaded successfully.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<AlgorithmSelector
					selected={searchState.currentAlgorithm}
					changeAlgorithm={changeAlgorithm}
				/>
				<AlgorithmOptions searchState={currentState} />
				<button type="submit">Search</button>
			</form>
			<button onClick={sendPrevMessage}>Previous</button>
			<button onClick={sendNextMessage}>Next</button>
		</main>
	)
}

export default App
