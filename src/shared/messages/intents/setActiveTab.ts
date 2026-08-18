import type { BaseIntent, IntentType } from "./intentTypes"

export interface SetActiveTab extends BaseIntent {
	intent: typeof IntentType.SELECT_GLOBAL_TAB
	payload: {
		tabId: number
	}
}
