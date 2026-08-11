export type SearchMode = "local" | "global"

export type SearchAlgorithm = "literal" | "regex"

export type LiteralConfig = {
	wholeWord: boolean
	caseSensitive: boolean
}

export type RegexConfig = {
	caseSensitive: boolean
}

export type SearchSession = LocalSearchSession | GlobalSearchSession

export type LocalSearchSession = {
	query: string

	mode: "local"
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

export type GlobalSearchSession = {
	query: string

	mode: "global"
	algorithm: SearchAlgorithm

	config: {
		literal: LiteralConfig
		regex: RegexConfig
	}

	results: {
		totalMatches: number
		currentIndex: number
		globalTotal: number
	}
}
