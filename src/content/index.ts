import { MessageType, type ExtensionMessage } from "../shared/messages/messages"
import { searchText } from "./search/searchText"
import { highlight } from "./highlight/highlight"
import { highlightCurrentMatch } from "./highlight/highlightCurrentMatch"
import type { SearchMatch } from "./search/match"
import { scrollToMatch } from "./navigation/scrollToMatch"
import "./highlight/highlight.css"
import { clearHighlights } from "./highlight/clearHighlight"

console.log("Content script injected.")

let matches: SearchMatch[] = []
let currentIndex = -1

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
	switch (message.type) {
		case MessageType.SEARCH:
			matches = searchText(message.query, message.searchConfig)
			currentIndex = matches.length > 0 ? 0 : -1

			const currentMatch =
				currentIndex >= 0 ? matches[currentIndex] : null

			highlight(matches)
			highlightCurrentMatch(currentMatch)
			scrollToMatch(currentMatch)

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
			clearHighlights()

			break
	}
})
