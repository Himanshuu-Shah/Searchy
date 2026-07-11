import type { SearchOptions } from "../../shared/messages/search"
import type { MatchLocation } from "./types"

function isWholeWord(text: string, start: number, end: number): boolean {
    const before = isWordCharacter(text[start - 1]);
    const after = isWordCharacter(text[end]);

    return !before && !after;
}

function isWordCharacter(character: string | undefined): boolean {
    return /\w/.test(character ?? "")
}

export function findMatches(text: string, query: string, options: SearchOptions): MatchLocation[] {
    if (query.length === 0) return []

    let position = 0
    const results: MatchLocation[] = []
    const searchableText = options.caseSensitive ? text : text.toLowerCase()
    const searchableQuery = options.caseSensitive ? query : query.toLowerCase()

    while(true) {
        const start = searchableText.indexOf(searchableQuery, position)
        
        if (start === -1) break
        if (!(options.wholeWord) || isWholeWord(searchableText, start, start + searchableQuery.length)) {
                results.push({
                start,
                end: start + searchableQuery.length
            })
        }

        position = start + searchableQuery.length
    }

    return results
}