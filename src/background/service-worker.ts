import type { Intent } from "../shared/messages/intents"
import type {
	ErrorResponse,
	SessionResponse,
	SuccessResponse,
} from "../shared/messages/intents/index"
import { processIntent } from "./intentProcessor"
import { publishSession } from "./publisher"
import { getOrCreateSession } from "./sessionManager"

console.log("Background service worker loaded")

chrome.runtime.onMessage.addListener(
	(
		message: Intent,
		sender,
		sendResponse: (
			response: SessionResponse | SuccessResponse | ErrorResponse
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

				console.log(session)

				sendResponse(response)
				publishSession(tabId, session)

				break
		}
	}
)
