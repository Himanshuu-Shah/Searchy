import type { ClearScope } from "./clearScope"
import type { NavigateToResult } from "./navigateToResult"
import type { NextResult } from "./nextResult"
import type { PreviousResult } from "./previousResult"
import type { RunSearch } from "./runSearch"
import type { ToggleScopeSelection } from "./toggleScopeSelection"

export type Command =
	| RunSearch
	| NextResult
	| PreviousResult
	| NavigateToResult
	| ToggleScopeSelection
	| ClearScope
