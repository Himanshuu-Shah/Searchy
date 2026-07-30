import type { BaseIntent, IntentType } from "./intentTypes"

export interface UpdateQuery extends BaseIntent {
	intent: typeof IntentType.SET_QUERY
	payload: { query: string }
}
