import type { BaseCommand, CommandType } from "./commandTypes"

export interface PreviousResult extends BaseCommand {
	command: typeof CommandType.PREVIOUS_RESULT
}
