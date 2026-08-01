import type { BaseIntent, IntentType } from "./intentTypes"

export interface UpdateRegexCaseSensitive extends BaseIntent {
	intent: typeof IntentType.SET_REGEXCASESENSITIVE
	payload: { enabled: boolean }
}
