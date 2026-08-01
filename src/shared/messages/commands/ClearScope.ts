import type { BaseCommand, CommandType } from "./commandTypes"

export interface ClearScope extends BaseCommand {
	command: typeof CommandType.CLEAR_SCOPE
}
