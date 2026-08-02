import type { ContentScriptEvent } from "../shared/messages/events/event"
import { EventType } from "../shared/messages/events/eventTypes"
import type { SuccessResponse } from "../shared/messages/response/response"
import type { SearchSession } from "../shared/messages/session/SearchSession"

export function processEvent(
	message: ContentScriptEvent,
	session: SearchSession
): SuccessResponse {
	switch (message.event) {
		case EventType.SEARCH_COMPLETED:
			session.results = message.payload

			return {
				success: true,
			}
		case EventType.SEARCH_INDEX_CHANGED:
			session.results.currentIndex = message.payload.currentIndex
			return {
				success: true,
			}
	}
}
