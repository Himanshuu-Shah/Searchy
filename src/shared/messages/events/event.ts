import type { SearchIndexUpdated } from "./searchIndex"
import type { SearchResultsUpdated } from "./searchResultsUpdated"

export type ContentScriptEvent = SearchResultsUpdated | SearchIndexUpdated
