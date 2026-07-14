import type { CurrentSearch } from "../build/buildCurrentSearch"
import { LiteralOptions } from "./options/literalSearchOptions"
import { RegexOptions } from "./options/regexSearchOptions"

type Props = {
	searchState: CurrentSearch
}

export function AlgorithmOptions({ searchState }: Props) {
	switch (searchState.algorithm) {
		case "literal":
			return (
				<LiteralOptions
					config={searchState.config}
					updateConfig={searchState.updateConfig}
				/>
			)
		case "regex":
			return (
				<RegexOptions
					config={searchState.config}
					updateConfig={searchState.updateConfig}
				/>
			)
	}
}
