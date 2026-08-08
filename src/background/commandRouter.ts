import type { ClearScope } from "../shared/messages/commands/clearScope"
import type { Command } from "../shared/messages/commands/command"
import { CommandType } from "../shared/messages/commands/commandTypes"
import type { NextResult } from "../shared/messages/commands/nextResult"
import type { PreviousResult } from "../shared/messages/commands/previousResult"
import type { RunSearch } from "../shared/messages/commands/runSearch"
import type { ToggleScopeSelection } from "../shared/messages/commands/toggleScopeSelection"
import type { Intent } from "../shared/messages/intents/intent"
import { IntentType } from "../shared/messages/intents/intentTypes"
import type { SearchSession } from "../shared/messages/session/SearchSession"

function createCommand(
	intent: Intent["intent"],
	session: SearchSession
): Command | null {
	switch (intent) {
		case IntentType.INITIATE_SESSION:
			return null

		case IntentType.SET_QUERY:
			return createRunSearch(session)

		case IntentType.SET_ALGORITHM:
			return createRunSearch(session)

		case IntentType.NEXT_RESULT:
			return createNextResult()

		case IntentType.PREVIOUS_RESULT:
			return createPreviousResult()

		case IntentType.SET_LITERALCASESENSITIVE:
			return createRunSearch(session)

		case IntentType.SET_LITERALWHOLEWORD:
			return createRunSearch(session)

		case IntentType.SET_REGEXCASESENSITIVE:
			return createRunSearch(session)

		case IntentType.TOGGLE_SCOPE_SELECTION:
			return createToggleScopeSelection()

		case IntentType.CLEAR_SCOPE:
			return createClearScope()

		case IntentType.SET_GLOBAL_MODE:
			return createRunSearch(session)

		case IntentType.SET_GLOBAL_PARTICIPANTS:
			return createRunSearch(session)
	}
}

function createRunSearch(session: SearchSession): RunSearch {
	switch (session.algorithm) {
		case "literal":
			return {
				type: "command",
				command: CommandType.RUN_SEARCH,
				payload: {
					query: session.query,
					algorithm: "literal",
					config: session.config.literal,
				},
			}

		case "regex":
			return {
				type: "command",
				command: CommandType.RUN_SEARCH,
				payload: {
					query: session.query,
					algorithm: "regex",
					config: session.config.regex,
				},
			}
	}
}

function createNextResult(): NextResult {
	return {
		type: "command",
		command: CommandType.NEXT_RESULT,
	}
}

function createPreviousResult(): PreviousResult {
	return {
		type: "command",
		command: CommandType.PREVIOUS_RESULT,
	}
}

function createToggleScopeSelection(): ToggleScopeSelection {
	return {
		type: "command",
		command: CommandType.TOGGLE_SCOPE_SELECTION,
	}
}

function createClearScope(): ClearScope {
	return {
		type: "command",
		command: CommandType.CLEAR_SCOPE,
	}
}

export function sendCommand(
	tabId: number,
	session: SearchSession,
	intent: Intent["intent"]
) {
	const message = createCommand(intent, session)
	if (message) {
		chrome.tabs.sendMessage(tabId, message)
	}
}
