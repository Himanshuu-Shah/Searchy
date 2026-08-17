import type { SearchPayload } from "../../shared/messages/commands/runSearch"
import { findMatches } from "./findmatches"
import { type SearchMatch } from "./match"

function isTextNodeVisible(node: Text): boolean {
	if (!node.textContent?.trim()) {
		return false
	}

	const host = document.getElementById("searchy-root")

	if (host?.contains(node)) {
		return false
	}

	const element = node.parentElement

	if (!element) {
		return false
	}

	const style = window.getComputedStyle(element)

	if (style.display === "none") {
		return false
	}

	if (style.visibility === "hidden") {
		return false
	}

	const range = document.createRange()
	range.selectNodeContents(node)

	return range.getClientRects().length > 0
}

/**
 * Searches all text nodes inside the given root node
 * using the provided search algorithm and configuration.
 */

export function searchText(
	searchNode: ParentNode,
	search: SearchPayload
): SearchMatch[] {
	if (!search.query.trim()) {
		return []
	}

	const results: SearchMatch[] = []

	const walker = document.createTreeWalker(searchNode, NodeFilter.SHOW_TEXT)

	let node = walker.nextNode()

	while (node) {
		const textNode = node as Text

		if (isTextNodeVisible(textNode)) {
			const text = textNode.textContent ?? ""
			const matches = findMatches(text, search)

			for (const match of matches) {
				results.push({
					...match,
					node: textNode,
				})
			}
		}

		node = walker.nextNode()
	}

	return results
}
