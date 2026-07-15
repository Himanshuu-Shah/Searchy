import type { SearchConfig } from "../../shared/search/searchConfigs"
import { findLiteralMatches } from "./literalSearch"
import { findRegexMatches } from "./regrexSearch"
import type { MatchLocation } from "./match"

/**
 * Dispatches the search request to the selected algorithm.
 */

export function findMatches(
	text: string,
	query: string,
	search: SearchConfig
): MatchLocation[] {
	switch (search.algorithm) {
		case "literal":
			return findLiteralMatches(text, query, search.config)
		case "regex":
			return findRegexMatches(text, query, search.config)
	}
}
