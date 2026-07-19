import SearchDock from "./components/SearchDock"
import { SearchSessionProvider } from "./session/SearchSessionProvider"

export default function App() {
	return (
		<SearchSessionProvider>
			<SearchDock />
		</SearchSessionProvider>
	)
}
