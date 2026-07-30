import type { Intent } from "../shared/messages/intents"
import type {
	ErrorResponse,
	SessionResponse,
	SuccessResponse,
} from "../shared/messages/intents/index"
import type { SearchSession } from "../shared/messages/session/SearchSession"

console.log("Background service worker loaded")

let searchSession: SearchSession = {
	query: "",

	mode: "local",
	algorithm: "literal",

	config: {
		literal: {
			caseSensitive: false,
			wholeWord: false,
		},
		regex: {
			caseSensitive: false,
		},
	},
}

function handleIntent(message: Intent) {
	switch (message.intent) {
		case "INITIATE_SESSION":
			return {
				success: true,
				searchSession,
			} satisfies SessionResponse

		case "SET_QUERY":
			searchSession.query = message.payload.query
			return { success: true } satisfies SuccessResponse

		case "SET_ALGORITHM":
			searchSession.algorithm = message.payload.algorithm
			return { success: true } satisfies SuccessResponse

		case "NEXT_RESULT":
			return { success: true } satisfies SuccessResponse

		case "PREVIOUS_RESULT":
			return { success: true } satisfies SuccessResponse

		case "SET_MODE":
			searchSession.mode = message.payload.mode
			return { success: true } satisfies SuccessResponse

		case "SET_LITERALCASESENSITIVE":
			searchSession.config.literal.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case "SET_LITERALWHOLEWORD":
			searchSession.config.literal.wholeWord = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case "SET_REGEXCASESENSITIVE":
			searchSession.config.regex.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse
	}
}

function publishSession(tabId: number) {
	chrome.tabs.sendMessage(tabId, {
		success: true,
		searchSession,
	} satisfies SessionResponse)
}

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
				const response = handleIntent(message)
				console.log(searchSession)
				sendResponse(response)

				if (!sender.tab?.id) {
					return
				}
				publishSession(sender.tab.id)

				break
		}
	}
)
