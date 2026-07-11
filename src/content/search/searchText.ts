import { type SearchMatch } from "./types"

export function searchText(query: string): SearchMatch[] {
    
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
        const start = text.indexOf(query)

        if (start !== -1) {
            results.push({
                node: node as Text,
                start,
                end: start + query.length,
            });
        }

        node = walker.nextNode()
    }

    return results
}