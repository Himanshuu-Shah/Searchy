import type { AlgorithmConfigs } from "../../shared/search/algorithmConfigs"
import type { SearchConfig } from "../../shared/search/searchConfigs"
import type { SearchState } from "../state/searchState"

export type CurrentSearch = {
	[A in keyof AlgorithmConfigs]: {
		algorithm: A
		config: AlgorithmConfigs[A]
		updateConfig(property: keyof AlgorithmConfigs[A], value: boolean): void
	}
}[keyof AlgorithmConfigs]

export function buildCurrentSearch(
	searchState: SearchConfig,
	setSearchState: React.Dispatch<React.SetStateAction<SearchState>>
): CurrentSearch {
	function createConfigUpdater<A extends keyof AlgorithmConfigs>(
		algorithm: A
	) {
		return function updateConfig(
			property: keyof AlgorithmConfigs[A],
			value: boolean
		): void {
			setSearchState((prev) => ({
				...prev,
				algorithmConfig: {
					...prev.algorithmConfig,
					[algorithm]: {
						...prev.algorithmConfig[algorithm],
						[property]: value,
					},
				},
			}))
		}
	}

	switch (searchState.algorithm) {
		case "literal":
			return {
				algorithm: searchState.algorithm,
				config: searchState.config,
				updateConfig: createConfigUpdater("literal"),
			}
		case "regex":
			return {
				algorithm: searchState.algorithm,
				config: searchState.config,
				updateConfig: createConfigUpdater("regex"),
			}
	}
}
