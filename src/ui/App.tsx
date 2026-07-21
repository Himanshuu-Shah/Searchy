import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"
import SearchDock from "./components/SearchDock/SearchDock"
import { DockProvider } from "./dock/DockStateProvider"
import { SearchSessionProvider } from "./session/SearchSessionProvider"

function SearchyApp() {
	useKeyboardShortcuts()

	return (
		<>
			<SearchDock />
		</>
	)
}

export default function App() {
	return (
		<DockProvider>
			<SearchSessionProvider>
				<SearchyApp />
			</SearchSessionProvider>
		</DockProvider>
	)
}
