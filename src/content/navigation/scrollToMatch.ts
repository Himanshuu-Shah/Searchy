import { createRange } from "../dom/createRange"
import { type SearchMatch } from "../search/match"

export function scrollToMatch(match: SearchMatch | null) {
	if (!match) {
		return
	}

	const range = createRange(match)

	let element: Element | null

	const container = range.commonAncestorContainer

	if (container.nodeType === Node.TEXT_NODE) {
		element = container.parentElement
	} else {
		element = container as Element
	}

	element?.scrollIntoView({
		behavior: "smooth",
		block: "center",
	})
}
