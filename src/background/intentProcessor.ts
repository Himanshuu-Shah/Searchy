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
	getGlobalTotalMatches,
	getSessionParticipants,
	getTabResults,
	isGlobalSessionParticipant,
	resolveSession,
	setGlobalMode,
	setGlobalParticipants,
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
			session.scopeSelection.enabled = message.payload.enabled
			return { success: true } satisfies SuccessResponse

		case IntentType.CLEAR_SCOPE:
			return { success: true } satisfies SuccessResponse
	}
}

async function processGlobalIntent(message: CoordinatorIntent) {
	switch (message.intent) {
		case IntentType.SET_GLOBAL_MODE: {
			await setGlobalMode(message.payload.mode)

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

export async function handleIntent(
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

			if (isGlobalSessionParticipant(tabId)) {
				for (const participant of getSessionParticipants(tabId)) {
					const tabSession = structuredClone(session)
					tabSession.results = {
						...getTabResults(participant),
						globalTotal: getGlobalTotalMatches(),
					}
					publishSession(participant, tabSession)
					sendCommand(participant, session, message.intent)
				}

				return
			}

			publishSession(tabId, session)
			sendCommand(tabId, session, message.intent)

			return
		}

		case IntentType.NEXT_RESULT: {
			const { tab, response } = await navigateNext(tabId)

			sendResponse(response)

			if (tab.type === "none") {
				return
			}

			const session = structuredClone(resolveSession(tab.tabId))
			session.results = getTabResults(tab.tabId)

			if (tab.type === "different-tab") {
				session.results = {
					...getTabResults(tab.tabId),
					currentIndex: tab.index,
				}
				await chrome.tabs.update(tab.tabId, { active: true })
			}

			sendCommand(tab.tabId, session, IntentType.NEXT_RESULT, {
				navigationType: tab.type,
				navigationIndex: session.results.currentIndex,
			})

			return
		}

		case IntentType.PREVIOUS_RESULT: {
			const { tab, response } = await navigatePrevious(tabId)

			sendResponse(response)

			if (tab.type === "none") {
				return
			}

			const session = structuredClone(resolveSession(tab.tabId))
			session.results = getTabResults(tab.tabId)

			if (tab.type === "different-tab") {
				session.results = {
					...getTabResults(tab.tabId),
					currentIndex: tab.index,
				}
				await chrome.tabs.update(tab.tabId, { active: true })
			}

			sendCommand(tab.tabId, session, IntentType.PREVIOUS_RESULT, {
				navigationType: tab.type,
				navigationIndex: session.results.currentIndex,
			})

			return
		}

		case IntentType.SET_GLOBAL_MODE:
		case IntentType.SET_GLOBAL_PARTICIPANTS: {
			const { response } = await processGlobalIntent(message)

			sendResponse(response)

			for (const participant of getSessionParticipants(tabId)) {
				const session = resolveSession(participant)
				console.log(session)

				publishSession(participant, session)
				sendCommand(participant, session, IntentType.SET_QUERY)
			}

			return
		}
	}
}
