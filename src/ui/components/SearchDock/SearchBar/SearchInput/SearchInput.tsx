import { useEffect, useRef } from "react"
import { useDock } from "../../../../dock/useDock"
import { useSearchSession } from "../../../../session/useSearchSession"
import "./SearchInput.css"
import { updateQueryIntent } from "../../../../sendIntent"

export default function SearchInput() {
	const { session, actions } = useSearchSession()
	const { dockState } = useDock()

	const inputRef = useRef<HTMLInputElement | null>(null)

	// Focus requests are expressed as state changes.
	// React runs this effect after committing the latest render,
	// ensuring the input is visible before attempting to focus it.
	useEffect(() => {
		if (dockState.visible) {
			inputRef.current?.focus()
			inputRef.current?.select()
		}
	}, [dockState.focusRequest])

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
				onChange={async (e) => {
					const query = e.target.value
					actions.query.change(query)

					updateQueryIntent(query).then((response) => {
						console.log(response)
					})
				}}
			/>
		</form>
	)
}
