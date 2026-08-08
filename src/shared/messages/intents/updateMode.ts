import type { SearchMode } from "../session/SearchSession"
import type { BaseIntent, IntentType } from "./intentTypes"

export interface UpdateMode extends BaseIntent {
	intent: typeof IntentType.SET_GLOBAL_MODE
	payload: { mode: SearchMode }
}
