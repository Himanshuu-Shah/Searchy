import type {
	SearchMode,
	SearchAlgorithm,
	SearchSession,
} from "./SearchSession"

export interface SearchSessionActions {
	query: {
		change(query: string): void
	}

	mode: {
		change(mode: SearchMode): void
	}

	algorithm: {
		change(algorithm: SearchAlgorithm): void
	}

	literal: {
		setWholeWord(enabled: boolean): void
		setCaseSensitive(enabled: boolean): void
	}

	regex: {
		setCaseSensitive(enabled: boolean): void
	}
}

export interface SearchSessionContextValue {
	session: SearchSession
	actions: SearchSessionActions
}
