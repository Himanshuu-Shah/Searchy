import { searchText } from "./search/searchText"
import { highlightCurrentMatch } from "./highlight/highlightCurrentMatch"
import type { SearchMatch } from "./search/match"
import { scrollToMatch } from "./navigation/scrollToMatch"
import { displaySearchResults } from "./search/displaySearchResults"
import { beginElementSelection } from "./dom/selectElement"
import { mountSearchy } from "../ui/mountSearchy"
import type { Command } from "../shared/messages/commands/command"
import { CommandType } from "../shared/messages/commands/commandTypes"
import type { SearchPayload } from "../shared/messages/commands/runSearch"
import "./highlight/highlight.css"
import {
	notifyCurrentIndex,
	notifyScopeSelection,
	notifySearchResults,
} from "./sendEvent"

console.log("Content script injected.")
mountSearchy()
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

let selectedScope: {
	element: HTMLElement
	outline: string
	outlineOffset: string
} | null = null

// The latest search request received from the popup.
// Stored so the search can be re-run when the scope changes.
let currentSearch: SearchPayload | null = null

// Cleanup function for the temporary element-selection listener.
// Non-null means the extension is currently waiting for the user
// to choose a search scope.
let stopSelection: (() => void) | null = null

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

	matches = searchText(searchNode, currentSearch)
	currentIndex = matches.length > 0 ? 0 : -1

	displaySearchResults(matches, currentIndex)
}

/**
 * Removes the active search scope and restores
 * the element's original appearance.
 */
function clearSelectedScope() {
	if (!selectedScope) {
		return
	}

	selectedScope.element.style.outline = selectedScope.outline
	selectedScope.element.style.outlineOffset = selectedScope.outlineOffset

	selectedScope = null
}

/**
 * Makes the given element the active search scope
 * and keeps it visually highlighted until cleared.
 */
function selectScope(element: HTMLElement) {
	clearSelectedScope()

	selectedScope = {
		element,
		outline: element.style.outline,
		outlineOffset: element.style.outlineOffset,
	}

	element.style.outline = "2px solid #6d7178"
	element.style.outlineOffset = "2px"

	searchNode = element
}

// ---------- Messages ----------

chrome.runtime.onMessage.addListener((message: Command) => {
	if (message.type !== "command") return

	switch (message.command) {
		case CommandType.RUN_SEARCH:
			currentSearch = message.payload
			rerunSearch()

			notifySearchResults(matches.length, currentIndex)

			break

		case CommandType.NEXT_RESULT:
			if (matches.length === 0) break

			currentIndex = (currentIndex + 1) % matches.length
			highlightCurrentMatch(matches[currentIndex])
			scrollToMatch(matches[currentIndex])

			notifyCurrentIndex(currentIndex)

			break

		case CommandType.PREVIOUS_RESULT:
			if (matches.length === 0) break

			currentIndex = (currentIndex - 1 + matches.length) % matches.length
			highlightCurrentMatch(matches[currentIndex])
			scrollToMatch(matches[currentIndex])

			notifyCurrentIndex(currentIndex)

			break

		case CommandType.TOGGLE_SCOPE_SELECTION:
			clearSelectedScope()

			if (stopSelection) {
				stopSelection()
				stopSelection = null

				break
			}

			stopSelection = beginElementSelection((element: HTMLElement) => {
				stopSelection = null

				selectScope(element)
				rerunSearch()

				notifySearchResults(matches.length, currentIndex)
				notifyScopeSelection(false)
			})

			break

		case CommandType.CLEAR_SCOPE:
			clearSelectedScope()

			searchNode = document.body
			rerunSearch()
			notifySearchResults(matches.length, currentIndex)

			break
	}
})
