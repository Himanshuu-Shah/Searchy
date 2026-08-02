import type { ContentScriptEvent } from "../shared/messages/events/event"
import { EventType } from "../shared/messages/events/eventTypes"
import type { SearchIndexUpdated } from "../shared/messages/events/searchIndex"
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
