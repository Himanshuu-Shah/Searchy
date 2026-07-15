import { highlight } from "../highlight/highlight"
import { highlightCurrentMatch } from "../highlight/highlightCurrentMatch"
import { scrollToMatch } from "../navigation/scrollToMatch"
import type { SearchMatch } from "./match"

/**
 * Updates the page to reflect the current search results.
 *
 * - Highlights all matches.
 * - Highlights the currently selected match.
 * - Scrolls the current match into view.
 */

export function displaySearchResulst(
	newMatches: SearchMatch[],
	currentIndex: number
) {
	const currentMatch = currentIndex >= 0 ? newMatches[currentIndex] : null

	highlight(newMatches)
	highlightCurrentMatch(currentMatch)
	scrollToMatch(currentMatch)
}
