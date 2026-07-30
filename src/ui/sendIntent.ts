import type { Intent } from "../shared/messages/intents"
import type { InitiateSession } from "../shared/messages/intents/initiateSession"
import type { UpdateAlgorithm } from "../shared/messages/intents/updateAlgorithm"
import type { UpdateMode } from "../shared/messages/intents/updateMode"
import type {
	NavigateNext,
	NavigatePrevious,
} from "../shared/messages/intents/updateNavigation"
import type { UpdateQuery } from "../shared/messages/intents/updateQuery"
import type {
	SearchAlgorithm,
	SearchMode,
} from "../shared/messages/session/SearchSession"

import type {
	ErrorResponse,
	SessionResponse,
	SuccessResponse,
} from "../shared/messages/intents/index"

function sendMessage<T>(message: Intent): Promise<T> {
	return chrome.runtime.sendMessage(message)
}

export async function initiateSession(): Promise<
	SessionResponse | ErrorResponse
> {
	return sendMessage({
		type: "intent",
		intent: "INITIATE_SESSION",
	} satisfies InitiateSession)
}

export async function updateAlgorithmIntent(
	algorithm: SearchAlgorithm
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: "SET_ALGORITHM",
		payload: {
			algorithm: algorithm,
		},
	} satisfies UpdateAlgorithm)
}

export async function updateQueryIntent(
	query: string
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: "SET_QUERY",
		payload: { query: query },
	} satisfies UpdateQuery)
}

export async function navigateNextIntent(): Promise<
	SuccessResponse | ErrorResponse
> {
	return sendMessage({
		type: "intent",
		intent: "NEXT_RESULT",
	} satisfies NavigateNext)
}

export async function navigatePreviousIntent(): Promise<
	SuccessResponse | ErrorResponse
> {
	return sendMessage({
		type: "intent",
		intent: "PREVIOUS_RESULT",
	} satisfies NavigatePrevious)
}

export async function updateModeIntent(
	mode: SearchMode
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: "SET_MODE",
		payload: {
			mode: mode,
		},
	} satisfies UpdateMode)
}

export async function updateLiteralCaseSensitive(
	checked: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: "SET_LITERALCASESENSITIVE",
		payload: { enabled: checked },
	})
}

export async function updateLiteralWholeWord(
	checked: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: "SET_LITERALWHOLEWORD",
		payload: { enabled: checked },
	})
}

export async function updateRegexCaseSensitive(
	checked: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: "SET_REGEXCASESENSITIVE",
		payload: { enabled: checked },
	})
}
