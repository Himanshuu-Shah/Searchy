import type { BaseIntent, IntentType } from "./intentTypes"

export interface ToggleScopeSelection extends BaseIntent {
	intent: typeof IntentType.TOGGLE_SCOPE_SELECTION
	payload: {
		enabled: boolean
	}
}

export interface ClearScope extends BaseIntent {
	intent: typeof IntentType.CLEAR_SCOPE
}
