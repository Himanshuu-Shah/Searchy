import type { ContentScriptEvent } from "../shared/messages/events/event"
import type { Intent } from "../shared/messages/intents/intent"
import type {
	ErrorResponse,
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import { IntentType } from "../shared/messages/intents/intentTypes"
import { sendCommand } from "./commandRouter"
import { processEvent } from "./eventProcessor"
import { processIntent } from "./intentProcessor"
import { publishSession } from "./publisher"
import { getOrCreateSession } from "./sessionManager"

console.log("Background service worker loaded")

chrome.runtime.onMessage.addListener(
	(
		message: Intent | ContentScriptEvent,
		sender,
		sendResponse: (
			response: Session | SuccessResponse | ErrorResponse
		) => void
	) => {
		console.log(
			message.type,
			message.type === "intent" ? message.intent : message.event
		)
		switch (message.type) {
			case "intent": {
				if (!sender.tab?.id) {
					return
				}

				const tabId = sender.tab.id

				const session = getOrCreateSession(tabId)
				const response = processIntent(message, session)

				sendResponse(response)

				if (message.intent !== IntentType.INITIATE_SESSION) {
					publishSession(tabId, session)
				}

				sendCommand(tabId, session, message.intent)

				break
			}

			case "event": {
				if (!sender.tab?.id) {
					return
				}

				const tabId = sender.tab.id

				const session = getOrCreateSession(tabId)
				const response = processEvent(message, session)

				sendResponse(response)
				publishSession(tabId, session)
			}
		}
	}
)
