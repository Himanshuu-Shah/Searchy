import type { SearchOptions } from "../../shared/messages/search"
import { findMatches } from "./findmatch"
import { type SearchMatch } from "./types"

export function searchText(query: string, options: SearchOptions): SearchMatch[] {
    
    if (!query.trim()) {
        return []
    }

    const results: SearchMatch[] = Array()

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    )

    let node = walker.nextNode()

    while (node) {
        const text = node.textContent || ""
        const matches = findMatches(text, query, options)
        
        for (const match of matches) {
            results.push({
                ...match,
                node: node as Text
            })
        }

        node = walker.nextNode()
    }

    return results
}