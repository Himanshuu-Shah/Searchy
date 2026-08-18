import { useState } from "react"
import type { SearchMode } from "../../../../../shared/messages/session/SearchSession"
import { useSearchSession } from "../../../../session/useSearchSession"
import Button from "../../../Button/Button"
import { updateModeIntent } from "../../../../sendIntent"
import "../../../../styles/dropdown.css"
import "./SearchMode.css"

const SEARCH_MODE: {
	id: SearchMode
	name: string
	description: string
}[] = [
	{
		id: "local",
		name: "Local",
		description: "Search in the local webpage",
	},
	{
		id: "global",
		name: "Global",
		description: "Search cross pages",
	},
]

export default function SearchModeSelector() {
	const [isOpen, setIsOpen] = useState(false)
	const { session } = useSearchSession()

	const selectedMode = SEARCH_MODE.find(
		(mode) => mode.id === session.mode
	)?.name

	return (
		<div className="searchModeSelector">
			<Button type="button" onClick={() => setIsOpen((open) => !open)}>
				{selectedMode}
			</Button>

			{isOpen && (
				<ul className="dropdown searchModes">
					{SEARCH_MODE.map((mode) => (
						<li
							key={mode.id}
							onClick={() => {
								const currentMode = mode.id

								updateModeIntent(currentMode)
								setIsOpen(false)
							}}
						>
							{mode.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
