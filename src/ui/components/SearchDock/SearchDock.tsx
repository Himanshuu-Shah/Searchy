import { useDock } from "../../dock/useDock"
import SearchBar from "./SearchBar/SearchBar"
import "./SearchDock.css"

export default function SearchDock() {
	const { state } = useDock()

	return (
		<div
			className={`searchDock ${state.visible ? "" : "searchDockHidden"}`}
		>
			<SearchBar />
		</div>
	)
}
