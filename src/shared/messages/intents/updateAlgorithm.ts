import type { SearchAlgorithm } from "../session/SearchSession"
import type { BaseIntent, IntentType } from "./intentTypes"

export interface UpdateAlgorithm extends BaseIntent {
	intent: typeof IntentType.SET_ALGORITHM
	payload: { algorithm: SearchAlgorithm }
}
