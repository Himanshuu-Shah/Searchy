import type { ContentScriptEvent } from "../shared/messages/events/event"
import { EventType } from "../shared/messages/events/eventTypes"
import type {
	ErrorResponse,
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import { publishSession } from "./publisher"
import {
	getGlobalTotalMatches,
	getSessionParticipants,
	getTabResults,
	isGlobalSessionParticipant,
	resolveSession,
	setTabResults,
} from "./sessionManager"

export function processEvent(
	message: ContentScriptEvent,
	tabId: number,
	sendResponse: (response: Session | SuccessResponse | ErrorResponse) => void
): void {
	const session = resolveSession(tabId)

	switch (message.event) {
		case EventType.SEARCH_COMPLETED: {
			if (isGlobalSessionParticipant(tabId)) {
				setTabResults(tabId, message.payload)

				sendResponse({ success: true })

				for (const participant of getSessionParticipants()) {
					const tabSession = structuredClone(session)
					tabSession.results = {
						...tabSession.results,
						...getTabResults(participant),
						globalTotal: getGlobalTotalMatches(),
					}
					publishSession(participant, tabSession)
				}

				break
			}

			session.results = message.payload

			sendResponse({ success: true })
			publishSession(tabId, session)

			break
		}

		case EventType.SEARCH_INDEX_CHANGED: {
			if (isGlobalSessionParticipant(tabId)) {
				const tabResults = structuredClone(getTabResults(tabId))

				if (!tabResults) {
					break
				}

				tabResults.currentIndex = message.payload.currentIndex
				setTabResults(tabId, tabResults)
				sendResponse({ success: true })

				const tabSession = structuredClone(session)
				tabSession.results = tabResults
				tabSession.results.globalTotal = getGlobalTotalMatches()
				publishSession(tabId, tabSession)

				break
			}

			session.results.currentIndex = message.payload.currentIndex

			sendResponse({ success: true })
			publishSession(tabId, session)

			break
		}

		case EventType.SCOPE_SELECTION_CHANGED: {
			session.scopeSelection.enabled = message.payload.enabled

			sendResponse({ success: true })
			publishSession(tabId, session)

			break
		}
	}
}
