import type { BaseIntent, IntentType } from "./intentTypes"

export interface NavigateNext extends BaseIntent {
	intent: typeof IntentType.NEXT_RESULT
}

export interface NavigatePrevious extends BaseIntent {
	intent: typeof IntentType.PREVIOUS_RESULT
}
