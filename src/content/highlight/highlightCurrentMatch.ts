import { createRange } from "../dom/createRange"
import { type SearchMatch } from "../search/match"

export function highlightCurrentMatch(match: SearchMatch | null) {
	if (!("highlights" in CSS)) {
		console.warn("CSS highlight not provided by the browser")
		return
	}

	CSS.highlights.delete("current-result")

	if (!match) {
		return
	}

	const range = createRange(match)

	const highlight = new Highlight(range)

	CSS.highlights.set("current-result", highlight)
}
