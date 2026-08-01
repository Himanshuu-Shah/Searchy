import type { Command } from "../shared/messages/commands/command"
import { CommandType } from "../shared/messages/commands/commandTypes"
import type { NextResult } from "../shared/messages/commands/nextResult"
import type { PreviousResult } from "../shared/messages/commands/PreviousResult"
import type { RunSearch } from "../shared/messages/commands/runSearch"
import type { Intent } from "../shared/messages/intents/intent"
import type { SearchSession } from "../shared/messages/session/SearchSession"

function createCommand(
	intent: Intent["intent"],
	session: SearchSession
): Command | null {
	switch (intent) {
		case "INITIATE_SESSION":
			return null

		case "SET_QUERY":
			return createRunSearch(session)

		case "SET_ALGORITHM":
			return createRunSearch(session)

		case "NEXT_RESULT":
			return createNextResult()

		case "PREVIOUS_RESULT":
			return createPreviousResult()

		case "SET_LITERALCASESENSITIVE":
			return createRunSearch(session)

		case "SET_LITERALWHOLEWORD":
			return createRunSearch(session)

		case "SET_REGEXCASESENSITIVE":
			return createRunSearch(session)

		case "SET_MODE":
			return null
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
