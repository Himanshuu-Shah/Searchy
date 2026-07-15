import type { SearchConfig } from "../../shared/search/searchConfigs"
import { findMatches } from "./findmatches"
import { type SearchMatch } from "./match"

/**
 * Searches all text nodes inside the given root node
 * using the provided search algorithm and configuration.
 */

export function searchText(
	searchNode: ParentNode,
	query: string,
	searchConfig: SearchConfig
): SearchMatch[] {
	if (!query.trim()) {
		return []
	}

	const results: SearchMatch[] = []

	const walker = document.createTreeWalker(searchNode, NodeFilter.SHOW_TEXT)

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
