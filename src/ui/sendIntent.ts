import type { Intent } from "../shared/messages/intents/intent"
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
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import { IntentType } from "../shared/messages/intents/intentTypes"

function sendMessage<T>(message: Intent): Promise<T> {
	return chrome.runtime.sendMessage(message)
}

export async function initiateSession(): Promise<Session | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: IntentType.INITIATE_SESSION,
	} satisfies InitiateSession)
}

export async function updateAlgorithmIntent(
	algorithm: SearchAlgorithm
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: IntentType.SET_ALGORITHM,
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
		intent: IntentType.SET_QUERY,
		payload: { query: query },
	} satisfies UpdateQuery)
}

export async function navigateNextIntent(): Promise<
	SuccessResponse | ErrorResponse
> {
	return sendMessage({
		type: "intent",
		intent: IntentType.NEXT_RESULT,
	} satisfies NavigateNext)
}

export async function navigatePreviousIntent(): Promise<
	SuccessResponse | ErrorResponse
> {
	return sendMessage({
		type: "intent",
		intent: IntentType.PREVIOUS_RESULT,
	} satisfies NavigatePrevious)
}

export async function updateModeIntent(
	mode: SearchMode
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: IntentType.SET_MODE,
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
		intent: IntentType.SET_LITERALCASESENSITIVE,
		payload: { enabled: checked },
	})
}

export async function updateLiteralWholeWord(
	checked: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: IntentType.SET_LITERALWHOLEWORD,
		payload: { enabled: checked },
	})
}

export async function updateRegexCaseSensitive(
	checked: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: IntentType.SET_REGEXCASESENSITIVE,
		payload: { enabled: checked },
	})
}

export async function toggleScopeSelection(
	checked: boolean
): Promise<SuccessResponse | ErrorResponse> {
	return sendMessage({
		type: "intent",
		intent: IntentType.TOGGLE_SCOPE_SELECTION,
		payload: {
			enabled: checked,
		},
	})
}

export async function clearSelectedScope(): Promise<
	SuccessResponse | ErrorResponse
> {
	return sendMessage({
		type: "intent",
		intent: IntentType.CLEAR_SCOPE,
	})
}
