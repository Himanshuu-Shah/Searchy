import type { SearchConfig } from "../search/searchConfigs"

export const MessageType = {
	SEARCH: "SEARCH",
	NEXT_RESULT: "NEXT_RESULT",
	PREVIOUS_RESULT: "PREVIOUS_RESULT",
	CLEAR_HIGHLIGHTS: "CLEAR_HIGHLIGHTS",
	START_SCOPE_SELECTION: "START_SCOPE_SELECTION",
} as const

export interface SearchMessage {
	type: typeof MessageType.SEARCH
	query: string
	searchConfig: SearchConfig
}

export interface NextResult {
	type: typeof MessageType.NEXT_RESULT
}

export interface PreviousResult {
	type: typeof MessageType.PREVIOUS_RESULT
}

export interface ClearHighlights {
	type: typeof MessageType.CLEAR_HIGHLIGHTS
}

export interface StartScopeSelection {
	type: typeof MessageType.START_SCOPE_SELECTION
}

export type ExtensionMessage =
	| SearchMessage
	| NextResult
	| PreviousResult
	| ClearHighlights
	| StartScopeSelection
