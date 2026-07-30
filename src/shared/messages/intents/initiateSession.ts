import type { BaseIntent, IntentType } from "./intentTypes"

export interface InitiateSession extends BaseIntent {
	intent: typeof IntentType.INITIATE_SESSION
}
