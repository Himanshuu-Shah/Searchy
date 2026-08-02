import SearchAlgorithmSelector from "./SearchAlgorithm/SearchAlgorithm"
import SearchInput from "./SearchInput/SearchInput"
import Navigation from "./Navigation/Navigation"
import SearchModeSelector from "./SearchMode/SearchMode"
import { SearchOptions } from "./SearchOptions/SearchOptions"
import { ScopeControls } from "./ScopeControls/ScopeControls"
import "./SearchBar.css"

export default function SearchBar() {
	return (
		<div className="searchBar">
			<SearchAlgorithmSelector />
			<SearchInput />
			<Navigation />
			<SearchOptions />
			<ScopeControls />
			<SearchModeSelector />
		</div>
	)
}
