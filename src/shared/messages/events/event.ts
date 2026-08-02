import type { ScopeSelectionUpdated } from "./scopeSelectionUpdated"
import type { SearchIndexUpdated } from "./searchIndexUpdated"
import type { SearchResultsUpdated } from "./searchResultsUpdated"

export type ContentScriptEvent =
	SearchResultsUpdated | SearchIndexUpdated | ScopeSelectionUpdated
