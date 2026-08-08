import type { BaseIntent, IntentType } from "./intentTypes"

export interface UpdateGlobalParticipants extends BaseIntent {
	intent: typeof IntentType.SET_GLOBAL_PARTICIPANTS
	payload: {
		participants: Set<number>
	}
}
