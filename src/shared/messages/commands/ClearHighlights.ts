import type { BaseCommand, CommandType } from "./commandTypes"

export interface ClearHighlights extends BaseCommand {
	command: typeof CommandType.CLEAR_HIGHLIGHTS
}
