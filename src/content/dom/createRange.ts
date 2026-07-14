import { type SearchMatch } from "../search/match"

export function createRange(match: SearchMatch): Range {
	const range = new Range()
	range.setStart(match.node, match.start)
	range.setEnd(match.node, match.end)

	return range
}
