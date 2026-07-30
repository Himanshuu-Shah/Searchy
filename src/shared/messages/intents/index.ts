import type { SearchSession } from "../session/SearchSession"
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

export type SuccessResponse = {
	success: true
}

export type SessionResponse = {
	success: true
	searchSession: SearchSession
}

export type ErrorResponse = {
	success: false
	error: string
}
