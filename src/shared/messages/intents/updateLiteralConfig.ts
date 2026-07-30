import type { BaseIntent, IntentType } from "./intentTypes"

// export const LiteralConfigIntentType = {
// 	SET_CASE_SENSITIVE: "SET_CASE_SENSITIVE",
// 	SET_WHOLE_WORD: "SET_WHOLE_WORD",
// } as const

export interface UpdateLiteralCaseSensitive extends BaseIntent {
	intent: typeof IntentType.SET_LITERALCASESENSITIVE
	payload: { enabled: boolean }
}

export interface UpdateLiteralWholeWord extends BaseIntent {
	intent: typeof IntentType.SET_LITERALWHOLEWORD
	payload: { enabled: boolean }
}
