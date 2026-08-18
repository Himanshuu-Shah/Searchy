import { useEffect, useState } from "react"
import { useSearchSession } from "../../../../session/useSearchSession"
import GlobalResultsToggle from "./GlobalResultsToggle"
import GlobalSearchResults from "./GlobalSearchResults"
import "./GlobalResults.css"

export default function GlobalResults() {
	const { session } = useSearchSession()
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		if (session.mode !== "global") {
			setExpanded(false)
		}
	}, [session.mode])

	if (session.mode !== "global") {
		return null
	}

	return (
		<>
			<GlobalResultsToggle
				setExpanded={setExpanded}
				expanded={expanded}
			/>

			{expanded && <GlobalSearchResults />}
		</>
	)
}
