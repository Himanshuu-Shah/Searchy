import SearchDock from "./components/SearchDock/SearchDock"
import { SearchSessionProvider } from "./session/SearchSessionProvider"

export default function App() {
	return (
		<SearchSessionProvider>
			<SearchDock />
		</SearchSessionProvider>
	)
}
