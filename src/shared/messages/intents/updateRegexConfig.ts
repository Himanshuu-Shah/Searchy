import type { BaseIntent, IntentType } from "./intentTypes"

// export const RegexConfigIntentType = {
// 	SET_CASE_SENSITIVE: "SET_CASE_SENSITIVE",
// } as const

export interface UpdateRegexCaseSensitive extends BaseIntent {
	intent: typeof IntentType.SET_REGEXCASESENSITIVE
	payload: { enabled: boolean }
}
