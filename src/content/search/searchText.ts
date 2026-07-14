import type { SearchConfig } from "../../shared/search/searchConfigs"
import { findMatches } from "./findmatches"
import { type SearchMatch } from "./match"

export function searchText(
	query: string,
	searchConfig: SearchConfig
): SearchMatch[] {
	if (!query.trim()) {
		return []
	}

	const results: SearchMatch[] = []

	const walker = document.createTreeWalker(
		document.body,
		NodeFilter.SHOW_TEXT
	)

	let node = walker.nextNode()

	while (node) {
		const text = node.textContent || ""
		const matches = findMatches(text, query, searchConfig)

		for (const match of matches) {
			results.push({
				...match,
				node: node as Text,
			})
		}

		node = walker.nextNode()
	}

	return results
}
