import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"
import SearchDock from "./components/SearchDock/SearchDock"
import { DockProvider } from "./dock/DockStateProvider"
import type { SearchSession } from "../shared/messages/session/SearchSession"
import { SearchSessionProvider } from "./session/SearchSessionProvider"

function SearchyApp() {
	useKeyboardShortcuts()

	return (
		<>
			<SearchDock />
		</>
	)
}

type prop = {
	initialSession: SearchSession
}

export default function App({ initialSession }: prop) {
	return (
		<DockProvider>
			<SearchSessionProvider initialSession={initialSession}>
				<SearchyApp />
			</SearchSessionProvider>
		</DockProvider>
	)
}
