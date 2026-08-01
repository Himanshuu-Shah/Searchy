import type { Intent } from "../shared/messages/intents/intent"
import type {
	ErrorResponse,
	Session,
	SuccessResponse,
} from "../shared/messages/intents/intent"
import { sendCommand } from "./commandRouter"
import { processIntent } from "./intentProcessor"
import { publishSession } from "./publisher"
import { getOrCreateSession } from "./sessionManager"

console.log("Background service worker loaded")

chrome.runtime.onMessage.addListener(
	(
		message: Intent,
		sender,
		sendResponse: (
			response: Session | SuccessResponse | ErrorResponse
		) => void
	) => {
		switch (message.type) {
			case "intent":
				if (!sender.tab?.id) {
					return
				}

				const tabId = sender.tab.id

				const session = getOrCreateSession(tabId)
				const response = processIntent(message, session)

				sendResponse(response)

				if (message.intent !== "INITIATE_SESSION") {
					publishSession(tabId, session)
				}

				sendCommand(tabId, session, message.intent)

				break
		}
	}
)
