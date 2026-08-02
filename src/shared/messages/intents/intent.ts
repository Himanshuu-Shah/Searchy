import type { InitiateSession } from "./initiateSession"
import type { UpdateAlgorithm } from "./updateAlgorithm"
import type {
	UpdateLiteralCaseSensitive,
	UpdateLiteralWholeWord,
} from "./updateLiteralConfig"
import type { UpdateMode } from "./updateMode"
import type { NavigateNext, NavigatePrevious } from "./updateNavigation"
import type { UpdateQuery } from "./updateQuery"
import type { UpdateRegexCaseSensitive } from "./updateRegexConfig"
import type { ClearScope, ToggleScopeSelection } from "./updateScope"

export type Intent =
	| UpdateQuery
	| UpdateAlgorithm
	| UpdateMode
	| NavigateNext
	| NavigatePrevious
	| InitiateSession
	| UpdateLiteralCaseSensitive
	| UpdateLiteralWholeWord
	| UpdateRegexCaseSensitive
	| ToggleScopeSelection
	| ClearScope
