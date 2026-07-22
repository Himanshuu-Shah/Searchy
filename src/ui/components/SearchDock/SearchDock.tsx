import { useDock } from "../../dock/useDock"
import SearchBar from "./SearchBar/SearchBar"
import "./SearchDock.css"

export default function SearchDock() {
	const { dockState } = useDock()

	return (
		<div
			className={`searchDock ${dockState.visible ? "" : "searchDockHidden"}`}
		>
			<SearchBar />
		</div>
	)
}
