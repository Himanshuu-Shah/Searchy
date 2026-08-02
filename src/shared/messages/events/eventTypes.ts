export type BaseEvent = {
	type: "event"
}

export const EventType = {
	SEARCH_COMPLETED: "SEARCH_COMPLETED",
	SEARCH_INDEX_CHANGED: "SEARCH_INDEX_CHANGED",
} as const
