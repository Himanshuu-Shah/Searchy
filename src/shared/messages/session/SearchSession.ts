export type SearchMode = "local" | "workspace"

export type SearchAlgorithm = "literal" | "regex"

export type LiteralConfig = {
	wholeWord: boolean
	caseSensitive: boolean
}

export type RegexConfig = {
	caseSensitive: boolean
}

export interface SearchSession {
	query: string

	mode: SearchMode
	algorithm: SearchAlgorithm

	config: {
		literal: LiteralConfig
		regex: RegexConfig
	}

	results: {
		totalMatches: number
		currentIndex: number
	}

	scopeSelection: {
		enabled: boolean
	}
}
