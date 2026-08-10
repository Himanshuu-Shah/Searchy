import type { InitiateSession } from "./initiateSession"
import type { UpdateAlgorithm } from "./updateAlgorithm"
import type { UpdateGlobalParticipants } from "./updateGlobalParticipants"
import type {
	UpdateLiteralCaseSensitive,
	UpdateLiteralWholeWord,
} from "./updateLiteralConfig"
import type { UpdateMode } from "./updateMode"
import type { NavigateNext, NavigatePrevious } from "./updateNavigation"
import type { UpdateQuery } from "./updateQuery"
import type { UpdateRegexCaseSensitive } from "./updateRegexConfig"
import type { ClearScope, ToggleScopeSelection } from "./updateScope"

export type SessionIntent =
	| UpdateQuery
	| UpdateAlgorithm
	| UpdateLiteralCaseSensitive
	| UpdateLiteralWholeWord
	| UpdateRegexCaseSensitive
	| ToggleScopeSelection
	| ClearScope

export type CoordinatorIntent = UpdateMode | UpdateGlobalParticipants

export type NavigationIntent = NavigateNext | NavigatePrevious

export type Intent =
	InitiateSession | SessionIntent | CoordinatorIntent | NavigationIntent
