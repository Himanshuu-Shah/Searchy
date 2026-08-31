import { useEffect, useRef } from "react"
import { useView } from "../../../view/useView"
import { useSearchSession } from "../../../session/useSearchSession"
import { updateQueryIntent } from "../../../sendIntent"
import GlobalResultsToggle from "../../GlobalResults/GlobalResultsToggle"
import GlobalSearchResults from "../../GlobalResults/GlobalSearchResults"
import "./SearchInput.css"

export default function SearchInput() {
	const { session } = useSearchSession()
	const { viewState } = useView()

	const inputRef = useRef<HTMLInputElement | null>(null)

	// Focus requests are expressed as state changes.
	// React runs this effect after committing the latest render,
	// ensuring the input is visible before attempting to focus it.
	useEffect(() => {
		if (viewState.searchyVisible) {
			inputRef.current?.focus()
			inputRef.current?.select()
		}
	}, [viewState.focusRequest])

	return (
		<form className="inputForm">
			<input
				ref={inputRef}
				className="inputBox"
				type="text"
				placeholder="Search"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault()
					}
				}}
				value={session.query}
				onChange={(e) => {
					const query = e.target.value
					updateQueryIntent(query)
				}}
			/>
			{session.mode === "global" && <GlobalResultsToggle />}
			{viewState.globalResultsVisible && <GlobalSearchResults />}
		</form>
	)
}
