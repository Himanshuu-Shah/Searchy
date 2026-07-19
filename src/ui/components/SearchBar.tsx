import SearchAlgorithmSelector from "./SearchAlgorithm"
import SearchInput from "./SearchInput"
import Navigation from "./Navigation"
import SearchModeSelector from "./SearchMode"
import { SearchOptions } from "./SearchConfig/SearchOptions"

export default function SearchBar() {
	return (
		<>
			<SearchAlgorithmSelector />
			<SearchInput />
			<Navigation />
			<SearchOptions />
			<SearchModeSelector />
		</>
	)
}
