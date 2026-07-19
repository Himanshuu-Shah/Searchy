import { useContext } from "react"

import { SearchSessionContext } from "./SearchSessionContext"

export function useSearchSession() {
	const context = useContext(SearchSessionContext)

	if (!context) {
		throw new Error(
			"useSearchSession must be used inside SearchSessionProvider"
		)
	}

	return context
}
