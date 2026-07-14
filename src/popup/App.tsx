import { useEffect, useState } from "react"
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
	sendClearMessage,
} from "./sendMessage"
import { buildSearchConfig } from "./build/buildSearchConfig"
import { AlgorithmOptions } from "./components/algorithmOptions"
import { buildCurrentSearch } from "./build/buildCurrentSearch"

function App() {
	const [input, setInput] = useState("")

	const [searchState, setSearchState] = useState<SearchState>(
		DEFAULT_POPUP_SEARCH_STATE
	)

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

	useEffect(() => {
		const query = input.trim()
		const search = currentState

		const timeoutId = setTimeout(() => {
			if (query === "") {
				sendClearMessage()
			} else {
				sendSearchMessage(query, search)
			}
		}, 150)

		return () => clearTimeout(timeoutId)
	}, [input, currentState])

	return (
		<main style={{ padding: 16, width: 320 }}>
			<h1>Searchy</h1>

			<p>Browser extension loaded successfully.</p>
			<form>
				<input
					type="text"
					placeholder="Search"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault()
						}
					}}
				/>
				<AlgorithmSelector
					selected={searchState.currentAlgorithm}
					changeAlgorithm={changeAlgorithm}
				/>
				<AlgorithmOptions searchState={currentState} />
			</form>
			<button onClick={sendPrevMessage}>Previous</button>
			<button onClick={sendNextMessage}>Next</button>
		</main>
	)
}

export default App
