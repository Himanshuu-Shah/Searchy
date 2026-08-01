import type { ClearHighlights } from "./ClearHighlights"
import type { ClearScope } from "./ClearScope"
import type { NextResult } from "./nextResult"
import type { PreviousResult } from "./PreviousResult"
import type { RunSearch } from "./runSearch"
import type { ToggleScopeSelection } from "./ToggleScopeSelection"

export type Command =
	| RunSearch
	| NextResult
	| PreviousResult
	| ClearHighlights
	| ToggleScopeSelection
	| ClearScope
