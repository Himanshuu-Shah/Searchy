import type { LiteralConfig, RegexConfig } from "../session/SearchSession"
import type { BaseCommand, CommandType } from "./commandTypes"

export type SearchPayload =
	| {
			query: string
			algorithm: "literal"
			config: LiteralConfig
	  }
	| {
			query: string
			algorithm: "regex"
			config: RegexConfig
	  }

export interface RunSearch extends BaseCommand {
	command: typeof CommandType.RUN_SEARCH
	payload: SearchPayload
}
