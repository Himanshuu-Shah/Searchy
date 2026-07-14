export type LiteralConfig = {
	caseSensitive: boolean
	wholeWord: boolean
}

export type RegexConfig = {
	caseSensitive: boolean
}

export type AlgorithmConfigs = {
	literal: LiteralConfig
	regex: RegexConfig
}
