import { setActiveTab } from "../../../../sendIntent"
import { useSearchSession } from "../../../../session/useSearchSession"

export default function GlobalSearchResults() {
	const { session } = useSearchSession()
	if (session.mode !== "global") {
		return
	}

	return (
		<ul className="dropdown globalSearchResults">
			{session.globalResults.tabResultsSummary.map((tab) => (
				<li key={tab.tabId} onClick={() => setActiveTab(tab.tabId)}>
					<span>{tab.tabName}</span>
					<span>{tab.totalMatches}</span>
				</li>
			))}
		</ul>
	)
}
