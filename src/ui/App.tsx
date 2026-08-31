import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"
import { ViewProvider } from "./view/ViewStateProvider"
import type { SearchSession } from "../shared/messages/session/SearchSession"
import { SearchSessionProvider } from "./session/SearchSessionProvider"
import { useView } from "./view/useView"
import SearchBar from "./components/SearchBar/SearchBar"

function SearchyApp() {
	useKeyboardShortcuts()
	const { viewState } = useView()

	return (
		<div
			style={{
				display: viewState.searchyVisible ? "block" : "none",
			}}
		>
			<SearchBar />
		</div>
	)
}

type prop = {
	initialSession: SearchSession
}

export default function App({ initialSession }: prop) {
	return (
		<ViewProvider>
			<SearchSessionProvider initialSession={initialSession}>
				<SearchyApp />
			</SearchSessionProvider>
		</ViewProvider>
	)
}
