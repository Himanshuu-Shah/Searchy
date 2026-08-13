import type { ContentScriptEvent } from "../shared/messages/events/event"
import type { Intent } from "../shared/messages/intents/intent"
import type {
	ErrorResponse,
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import { processEvent } from "./eventProcessor"
import { processIntent } from "./intentProcessor"
import {
	removeGlobalParticipant,
	resolveSession,
	syncGlobalParticipants,
} from "./sessionManager"

type MessageResponse = Session | SuccessResponse | ErrorResponse

console.log("Background service worker loaded")

chrome.runtime.onMessage.addListener(
	(
		message: Intent | ContentScriptEvent,
		sender,
		sendResponse: (response: MessageResponse) => void
	) => {
		console.log(
			message.type,
			message.type === "intent" ? message.intent : message.event
		)

		switch (message.type) {
			case "intent": {
				if (sender.tab?.id === undefined) {
					return
				}

				const tabId = sender.tab.id
				processIntent(message, tabId, sendResponse)

				return true
			}

			case "event": {
				if (sender.tab?.id === undefined) {
					return
				}

				const tabId = sender.tab.id
				processEvent(message, tabId, sendResponse)

				return
			}
		}
	}
)

chrome.tabs.onRemoved.addListener((tabId) => {
	const session = resolveSession(tabId)

	if (session.mode === "local") {
		return
	}

	removeGlobalParticipant(tabId)

	syncGlobalParticipants(session)
})
