import type { LiteralConfig, RegexConfig } from "./algorithmConfigs"

type LiteralSearch = {
	algorithm: "literal"
	config: LiteralConfig
}

type RegexSearch = {
	algorithm: "regex"
	config: RegexConfig
}

export type SearchConfig = LiteralSearch | RegexSearch
