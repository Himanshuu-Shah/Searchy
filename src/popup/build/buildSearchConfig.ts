import type { SearchConfig } from "../../shared/search/searchConfigs"
import type { SearchState } from "../state/searchState"

export function buildSearchConfig(searchState: SearchState): SearchConfig {
	switch (searchState.currentAlgorithm) {
		case "literal":
			return {
				algorithm: "literal",
				config: searchState.algorithmConfig.literal,
			}
		case "regex":
			return {
				algorithm: "regex",
				config: searchState.algorithmConfig.regex,
			}
	}
}
