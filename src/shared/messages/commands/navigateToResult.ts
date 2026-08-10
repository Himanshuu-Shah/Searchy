import type { BaseCommand, CommandType } from "./commandTypes"

export interface NavigateToResult extends BaseCommand {
	command: typeof CommandType.NAVIGATE_TO_RESULT
	payload: {
		index: number
	}
}
