import type { BaseCommand, CommandType } from "./commandTypes"

export interface NextResult extends BaseCommand {
	command: typeof CommandType.NEXT_RESULT
}
