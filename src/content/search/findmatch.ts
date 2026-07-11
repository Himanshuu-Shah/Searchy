import type { MatchLocation } from "./types"

export function findMatches(text: string, query: string): MatchLocation[] {
    if (query.length === 0) return []

    let position = 0
    const results: MatchLocation[] = []

    while(true) {
        const start = text.indexOf(query, position)
        
        if (start === -1) break

        results.push({
            start,
            end: start + query.length
        })

        position = start + query.length
    }

    return results
}