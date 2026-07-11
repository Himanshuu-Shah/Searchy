import type { SearchOptions } from "../../shared/messages/search"
import type { MatchLocation } from "./types"

export function findMatches(text: string, query: string, options: SearchOptions): MatchLocation[] {
    if (query.length === 0) return []

    let position = 0
    const results: MatchLocation[] = []
    const searchableText = options.caseSensitive ? text : text.toLowerCase()
    const searchableQury = options.caseSensitive ? query : query.toLowerCase()

    while(true) {
        const start = searchableText.indexOf(searchableQury, position)
        
        if (start === -1) break

        results.push({
            start,
            end: start + searchableQury.length
        })

        position = start + searchableQury.length
    }

    return results
}