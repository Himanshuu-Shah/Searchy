import type { BaseIntent, IntentType } from "./intentTypes"

export interface UpdateLiteralCaseSensitive extends BaseIntent {
	intent: typeof IntentType.SET_LITERALCASESENSITIVE
	payload: { enabled: boolean }
}

export interface UpdateLiteralWholeWord extends BaseIntent {
	intent: typeof IntentType.SET_LITERALWHOLEWORD
	payload: { enabled: boolean }
}
