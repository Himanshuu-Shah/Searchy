import type { ContentScriptEvent } from "../shared/messages/events/event"
import { EventType } from "../shared/messages/events/eventTypes"
import type { ScopeSelectionUpdated } from "../shared/messages/events/scopeSelectionUpdated"
import type { SearchIndexUpdated } from "../shared/messages/events/searchIndexUpdated"
import type { SearchResultsUpdated } from "../shared/messages/events/searchResultsUpdated"
import type {
	ErrorResponse,
	SuccessResponse,
} from "../shared/messages/response/response"

function sendMessage<T>(message: ContentScriptEvent): Promise<T> {
	return chrome.runtime.sendMessage(message)
}

export async function notifySearchResults(
	totalMatches: number,
	currentIndex: number
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "event",
		event: EventType.SEARCH_COMPLETED,
		payload: {
			totalMatches,
			currentIndex,
		},
	} satisfies SearchResultsUpdated)
}

export async function notifyCurrentIndex(
	currentIndex: number
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "event",
		event: EventType.SEARCH_INDEX_CHANGED,
		payload: {
			currentIndex,
		},
	} satisfies SearchIndexUpdated)
}

export async function notifyScopeSelection(
	enabled: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "event",
		event: EventType.SCOPE_SELECTION_CHANGED,
		payload: {
			enabled,
		},
	} satisfies ScopeSelectionUpdated)
}
