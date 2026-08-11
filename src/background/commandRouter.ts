import type { ClearScope } from "../shared/messages/commands/clearScope"
import type { Command } from "../shared/messages/commands/command"
import { CommandType } from "../shared/messages/commands/commandTypes"
import type { NavigateToResult } from "../shared/messages/commands/navigateToResult"
import type { NextResult } from "../shared/messages/commands/nextResult"
import type { PreviousResult } from "../shared/messages/commands/previousResult"
import type { RunSearch } from "../shared/messages/commands/runSearch"
import type { ToggleScopeSelection } from "../shared/messages/commands/toggleScopeSelection"
import type { Intent } from "../shared/messages/intents/intent"
import { IntentType } from "../shared/messages/intents/intentTypes"
import type { SearchSession } from "../shared/messages/session/SearchSession"

type CommandOptions =
	| {
			session: SearchSession
	  }
	| {
			navigation: NavigationOptions
	  }

type NavigationOptions =
	| {
			type: "same-tab"
	  }
	| {
			type: "different-tab"
			index: number
	  }

function createCommand(
	intent: Intent["intent"],
	options?: CommandOptions
): Command | null {
	switch (intent) {
		case IntentType.INITIATE_SESSION:
			return null

		case IntentType.SET_QUERY:
		case IntentType.SET_ALGORITHM:
		case IntentType.SET_LITERALCASESENSITIVE:
		case IntentType.SET_LITERALWHOLEWORD:
		case IntentType.SET_REGEXCASESENSITIVE:
		case IntentType.SET_GLOBAL_MODE:
		case IntentType.SET_GLOBAL_PARTICIPANTS:
			if (options && "session" in options) {
				return createRunSearch(options.session)
			}

			return null

		case IntentType.NEXT_RESULT:
			if (options && "navigation" in options) {
				return createNextResult(options.navigation)
			}

			return null

		case IntentType.PREVIOUS_RESULT:
			if (options && "navigation" in options) {
				return createPreviousResult(options.navigation)
			}

			return null

		case IntentType.TOGGLE_SCOPE_SELECTION:
			return createToggleScopeSelection()

		case IntentType.CLEAR_SCOPE:
			return createClearScope()
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
			} satisfies RunSearch

		case "regex":
			return {
				type: "command",
				command: CommandType.RUN_SEARCH,
				payload: {
					query: session.query,
					algorithm: "regex",
					config: session.config.regex,
				},
			} satisfies RunSearch
	}
}

function createNextResult(
	navigation: NavigationOptions
): NextResult | NavigateToResult {
	if (navigation.type === "same-tab") {
		return {
			type: "command",
			command: CommandType.NEXT_RESULT,
		} satisfies NextResult
	}
	return {
		type: "command",
		command: CommandType.NAVIGATE_TO_RESULT,
		payload: { index: navigation.index },
	} satisfies NavigateToResult
}

function createPreviousResult(
	navigation: NavigationOptions
): PreviousResult | NavigateToResult {
	if (navigation.type === "same-tab") {
		return {
			type: "command",
			command: CommandType.PREVIOUS_RESULT,
		} satisfies PreviousResult
	}
	return {
		type: "command",
		command: CommandType.NAVIGATE_TO_RESULT,
		payload: { index: navigation.index },
	} satisfies NavigateToResult
}

function createToggleScopeSelection(): ToggleScopeSelection {
	return {
		type: "command",
		command: CommandType.TOGGLE_SCOPE_SELECTION,
	} satisfies ToggleScopeSelection
}

function createClearScope(): ClearScope {
	return {
		type: "command",
		command: CommandType.CLEAR_SCOPE,
	} satisfies ClearScope
}

export function sendCommand(
	tabId: number,
	intent: Intent["intent"],
	options?: CommandOptions
) {
	const message = createCommand(intent, options)
	if (message) {
		chrome.tabs.sendMessage(tabId, message)
	}
}
