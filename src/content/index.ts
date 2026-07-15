import { MessageType, type ExtensionMessage } from "../shared/messages/messages"
import { searchText } from "./search/searchText"
import { highlightCurrentMatch } from "./highlight/highlightCurrentMatch"
import type { SearchMatch } from "./search/match"
import { scrollToMatch } from "./navigation/scrollToMatch"
import "./highlight/highlight.css"
import { clearHighlights } from "./highlight/clearHighlight"
import type { SearchConfig } from "../shared/search/searchConfigs"
import { displaySearchResulst } from "./search/displaySearchResults"
import { beginElementSelection } from "./dom/selectElement"

console.log("Content script injected.")

// ---------- State ----------

// Current search results
let matches: SearchMatch[] = []

// Index of the currently focused match in `matches`.
// -1 means no match is currently selected.
let currentIndex = -1

// Root node used when searching the page.
// Defaults to the whole document body, but changes when the user
// selects a search scope.
let searchNode: ParentNode = document.body

// The latest search request received from the popup.
// Stored so the search can be re-run when the scope changes.
let currentSearch: {
	query: string
	searchConfig: SearchConfig
} | null = null

// Cleanup function for the temporary element-selection listener.
// Non-null means the extension is currently waiting for the user
// to choose a search scope.
let stopSelection: (() => void) | null = null //

// ---------- Helpers ----------

/**
 * Executes the latest search request using the current search scope.
 *
 * Used when:
 * - a new search request arrives from the popup
 * - the user selects a different search scope
 */
function rerunSearch() {
	if (!currentSearch) return

	matches = searchText(
		searchNode,
		currentSearch.query,
		currentSearch.searchConfig
	)

	currentIndex = matches.length > 0 ? 0 : -1

	displaySearchResulst(matches, currentIndex)
}

// ---------- Messages ----------

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
	switch (message.type) {
		case MessageType.SEARCH:
			currentSearch = {
				query: message.query,
				searchConfig: message.searchConfig,
			}

			rerunSearch()

			break

		case MessageType.NEXT_RESULT:
			if (matches.length === 0) break

			currentIndex = (currentIndex + 1) % matches.length
			highlightCurrentMatch(matches[currentIndex])
			scrollToMatch(matches[currentIndex])

			break

		case MessageType.PREVIOUS_RESULT:
			if (matches.length === 0) break

			currentIndex = (currentIndex - 1 + matches.length) % matches.length
			highlightCurrentMatch(matches[currentIndex])
			scrollToMatch(matches[currentIndex])

			break

		case MessageType.CLEAR_HIGHLIGHTS:
			currentSearch = null
			matches = []
			currentIndex = -1
			clearHighlights()

			break

		case MessageType.TOGGLE_SCOPE_SELECTION:
			if (stopSelection) {
				stopSelection()
				stopSelection = null
				break
			}

			stopSelection = beginElementSelection((element: Element) => {
				searchNode = element
				stopSelection = null
				rerunSearch()
			})
	}
})
