import type { BaseEvent, EventType } from "./eventTypes"

export interface SearchResultsUpdated extends BaseEvent {
	event: typeof EventType.SEARCH_COMPLETED
	payload: {
		totalMatches: number
		currentIndex: number
	}
}
