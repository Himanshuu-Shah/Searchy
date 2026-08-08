import type {
	CoordinatorIntent,
	Intent,
	SessionIntent,
} from "../shared/messages/intents/intent"
import { IntentType } from "../shared/messages/intents/intentTypes"
import type {
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import type { SearchSession } from "../shared/messages/session/SearchSession"
import { sendCommand } from "./commandRouter"
import { publishSession } from "./publisher"
import {
	getSessionParticipants,
	resolveSession,
	setGlobalMode,
	setGlobalParticipants,
} from "./sessionManager"

// export function processIntent(
// 	message: Intent,
// 	session: SearchSession
// ): Session | SuccessResponse {
// 	switch (message.intent) {
// 		case IntentType.INITIATE_SESSION:
// 			return {
// 				type: "session",
// 				searchSession: session,
// 			} satisfies Session

// 		case IntentType.SET_QUERY:
// 			session.query = message.payload.query
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.SET_ALGORITHM:
// 			session.algorithm = message.payload.algorithm
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.NEXT_RESULT:
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.PREVIOUS_RESULT:
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.SET_MODE:
// 			session.mode = message.payload.mode
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.SET_LITERALCASESENSITIVE:
// 			session.config.literal.caseSensitive = message.payload.enabled
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.SET_LITERALWHOLEWORD:
// 			session.config.literal.wholeWord = message.payload.enabled
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.SET_REGEXCASESENSITIVE:
// 			session.config.regex.caseSensitive = message.payload.enabled
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.TOGGLE_SCOPE_SELECTION:
// 			session.scopeSelection.enabled = message.payload.enabled
// 			return { success: true } satisfies SuccessResponse

// 		case IntentType.CLEAR_SCOPE:
// 			return { success: true } satisfies SuccessResponse
// 	}
// }

function processSessionIntent(message: SessionIntent, session: SearchSession) {
	switch (message.intent) {
		case IntentType.SET_QUERY:
			session.query = message.payload.query
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_ALGORITHM:
			session.algorithm = message.payload.algorithm
			return { success: true } satisfies SuccessResponse

		case IntentType.NEXT_RESULT:
			return { success: true } satisfies SuccessResponse

		case IntentType.PREVIOUS_RESULT:
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_LITERALCASESENSITIVE:
			session.config.literal.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_LITERALWHOLEWORD:
			session.config.literal.wholeWord = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_REGEXCASESENSITIVE:
			session.config.regex.caseSensitive = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.TOGGLE_SCOPE_SELECTION:
			session.scopeSelection.enabled = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.CLEAR_SCOPE:
			return { success: true } satisfies SuccessResponse
	}
}

async function processGlobalIntent(message: CoordinatorIntent) {
	switch (message.intent) {
		case IntentType.SET_GLOBAL_MODE: {
			const participants = await setGlobalMode(message.payload.mode)

			return {
				response: { success: true } satisfies SuccessResponse,
				participants,
			}
		}

		case IntentType.SET_GLOBAL_PARTICIPANTS: {
			const participants = setGlobalParticipants(
				message.payload.participants
			)

			return {
				response: { success: true } satisfies SuccessResponse,
				participants,
			}
		}
	}
}

export async function handleIntent(
	message: Intent,
	tabId: number,
	sendResponse: (response: Session | SuccessResponse) => void
): Promise<void> {
	switch (message.intent) {
		case IntentType.INITIATE_SESSION: {
			const session = resolveSession(tabId)

			sendResponse({
				type: "session",
				searchSession: session,
			})

			return
		}

		case IntentType.SET_QUERY:
		case IntentType.SET_ALGORITHM:
		case IntentType.NEXT_RESULT:
		case IntentType.PREVIOUS_RESULT:
		case IntentType.SET_LITERALCASESENSITIVE:
		case IntentType.SET_LITERALWHOLEWORD:
		case IntentType.SET_REGEXCASESENSITIVE:
		case IntentType.TOGGLE_SCOPE_SELECTION:
		case IntentType.CLEAR_SCOPE: {
			const session = resolveSession(tabId)

			const response = processSessionIntent(message, session)

			sendResponse(response)

			const participants = getSessionParticipants(tabId)

			for (const participant of participants) {
				publishSession(participant, session)
				sendCommand(participant, session, message.intent)
			}

			return
		}

		case IntentType.SET_GLOBAL_MODE:
		case IntentType.SET_GLOBAL_PARTICIPANTS: {
			const { response, participants } =
				await processGlobalIntent(message)

			sendResponse(response)

			for (const participant of participants) {
				const session = resolveSession(participant)

				publishSession(participant, session)
				sendCommand(participant, session, IntentType.SET_QUERY)
			}

			return
		}
	}
}
