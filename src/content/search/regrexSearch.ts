import type { RegexConfig } from "../../shared/search/algorithmConfigs"
import type { MatchLocation } from "./match"

/**
 * Finds matches using a regular expression.
 *
 * Invalid regular expressions are caught and treated as
 * having no matches.
 */

export function findRegexMatches(
	text: string,
	query: string,
	config: RegexConfig
): MatchLocation[] {
	if (query.length === 0) return []

	const results: MatchLocation[] = []
	let match: RegExpExecArray | null
	try {
		const queryRegex = new RegExp(query, config.caseSensitive ? "g" : "gi")
		while ((match = queryRegex.exec(text)) !== null) {
			results.push({
				start: match.index,
				end: match.index + match[0].length,
			})
		}
	} catch (error) {
		console.error("Invalid regex:", error)
		return []
	}

	return results
}
