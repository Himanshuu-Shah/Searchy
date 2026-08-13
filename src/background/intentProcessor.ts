import type {
	CoordinatorIntent,
	Intent,
	SessionIntent,
} from "../shared/messages/intents/intent"
import { IntentType } from "../shared/messages/intents/intentTypes"
import type {
	ErrorResponse,
	Session,
	SuccessResponse,
} from "../shared/messages/response/response"
import type { SearchSession } from "../shared/messages/session/SearchSession"
import { sendCommand } from "./commandRouter"
import { navigateNext, navigatePrevious } from "./navigationManager"
import { publishSession } from "./publisher"
import {
	getSessionParticipants,
	resolveSession,
	setGlobalMode,
	setGlobalParticipants,
	syncGlobalParticipants,
} from "./sessionManager"

function processSessionIntent(message: SessionIntent, session: SearchSession) {
	switch (message.intent) {
		case IntentType.SET_QUERY:
			session.query = message.payload.query
			return { success: true } satisfies SuccessResponse

		case IntentType.SET_ALGORITHM:
			session.algorithm = message.payload.algorithm
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
			if (session.mode === "local") {
				session.scopeSelection.enabled = message.payload.enabled
				return { success: true } satisfies SuccessResponse
			}
			return { success: false, error: "" } satisfies ErrorResponse

		case IntentType.CLEAR_SCOPE:
			return { success: true } satisfies SuccessResponse
	}
}

async function processGlobalIntent(message: CoordinatorIntent, tabId: number) {
	switch (message.intent) {
		case IntentType.SET_GLOBAL_MODE: {
			const initialParticipants = getSessionParticipants()

			await setGlobalMode(message.payload.mode)

			const session = resolveSession(tabId)

			if (session.mode === "global") {
				syncGlobalParticipants(session, IntentType.SET_QUERY)
			} else {
				for (const participant of initialParticipants) {
					const session = resolveSession(participant)
					publishSession(participant, session)
					sendCommand(participant, IntentType.SET_QUERY, { session })
				}
			}

			return {
				response: { success: true } satisfies SuccessResponse,
			}
		}

		case IntentType.SET_GLOBAL_PARTICIPANTS: {
			setGlobalParticipants(message.payload.participants)

			return {
				response: { success: true } satisfies SuccessResponse,
			}
		}
	}
}

export async function processIntent(
	message: Intent,
	tabId: number,
	sendResponse: (response: Session | SuccessResponse | ErrorResponse) => void
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
		case IntentType.SET_LITERALCASESENSITIVE:
		case IntentType.SET_LITERALWHOLEWORD:
		case IntentType.SET_REGEXCASESENSITIVE:
		case IntentType.TOGGLE_SCOPE_SELECTION:
		case IntentType.CLEAR_SCOPE: {
			const session = resolveSession(tabId)
			const response = processSessionIntent(message, session)

			sendResponse(response)

			if (session.mode === "global") {
				syncGlobalParticipants(session, message.intent)

				return
			}

			publishSession(tabId, session)
			sendCommand(tabId, message.intent, { session })

			return
		}

		case IntentType.NEXT_RESULT: {
			const { tab, response } = await navigateNext(tabId)

			sendResponse(response)

			if (tab.type === "none") {
				return
			}

			if (tab.type === "same-tab") {
				sendCommand(tab.tabId, IntentType.NEXT_RESULT, {
					navigation: {
						type: "same-tab",
					},
				})

				return
			}

			await chrome.tabs.update(tab.tabId, { active: true })
			sendCommand(tab.tabId, IntentType.NEXT_RESULT, {
				navigation: { type: tab.type, index: tab.matchIndex },
			})

			return
		}

		case IntentType.PREVIOUS_RESULT: {
			const { tab, response } = await navigatePrevious(tabId)

			sendResponse(response)

			if (tab.type === "none") {
				return
			}

			if (tab.type === "same-tab") {
				sendCommand(tab.tabId, IntentType.PREVIOUS_RESULT, {
					navigation: {
						type: "same-tab",
					},
				})

				return
			}

			await chrome.tabs.update(tab.tabId, { active: true })
			sendCommand(tab.tabId, IntentType.PREVIOUS_RESULT, {
				navigation: { type: tab.type, index: tab.matchIndex },
			})

			return
		}

		case IntentType.SET_GLOBAL_MODE:
		case IntentType.SET_GLOBAL_PARTICIPANTS: {
			const { response } = await processGlobalIntent(message, tabId)

			sendResponse(response)

			return
		}
	}
}
