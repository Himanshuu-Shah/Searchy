import type { SearchAlgorithms } from "./algorithms"
import type {
	LiteralConfig,
	RegexConfig,
} from "../../shared/search/algorithmConfigs"

export interface SearchState {
	currentAlgorithm: SearchAlgorithms

	algorithmConfig: {
		literal: LiteralConfig
		regex: RegexConfig
	}
}

export const DEFAULT_POPUP_SEARCH_STATE: SearchState = {
	currentAlgorithm: "literal",

	algorithmConfig: {
		literal: {
			caseSensitive: false,
			wholeWord: false,
		},
		regex: {
			caseSensitive: false,
		},
	},
}
