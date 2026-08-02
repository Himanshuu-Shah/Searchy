import type { BaseEvent, EventType } from "./eventTypes"

export interface SearchIndexUpdated extends BaseEvent {
	event: typeof EventType.SEARCH_INDEX_CHANGED
	payload: {
		currentIndex: number
	}
}
