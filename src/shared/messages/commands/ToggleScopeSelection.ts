import type { BaseCommand, CommandType } from "./commandTypes"

export interface ToggleScopeSelection extends BaseCommand {
	command: typeof CommandType.TOGGLE_SCOPE_SELECTION
}
