import type { BaseEvent, EventType } from "./eventTypes"

export interface ScopeSelectionUpdated extends BaseEvent {
	event: typeof EventType.SCOPE_SELECTION_CHANGED
	payload: {
		enabled: boolean
	}
}
