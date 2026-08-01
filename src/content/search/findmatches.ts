import { findLiteralMatches } from "./literalSearch"
import { findRegexMatches } from "./regrexSearch"
import type { MatchLocation } from "./match"
import type { SearchPayload } from "../../shared/messages/commands/runSearch"

/**
 * Dispatches the search request to the selected algorithm.
 */

export function findMatches(
	text: string,
	search: SearchPayload
): MatchLocation[] {
	switch (search.algorithm) {
		case "literal":
			return findLiteralMatches(text, search.query, search.config)
		case "regex":
			return findRegexMatches(text, search.query, search.config)
	}
}
