import { useState } from "react"
import type { SearchMode } from "../session/SearchSession"
import { useSearchSession } from "../session/useSearchSession"

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
		id: "workspace",
		name: "WorkSpace",
		description: "Search cross pages",
	},
]

export default function SearchModeSelector() {
	const [isOpen, setIsOpen] = useState(false)
	const { session, actions } = useSearchSession()

	const selectedMode = SEARCH_MODE.find(
		(mode) => mode.id === session.mode
	)?.name

	return (
		<div style={{ position: "relative", width: "200px" }}>
			<button type="button" onClick={() => setIsOpen((open) => !open)}>
				{selectedMode}
			</button>

			{isOpen && (
				<ul
					style={{
						listStyle: "none",
						padding: 0,
						margin: 0,
						border: "1px solid #ccc",
						position: "absolute",
						width: "100%",
						background: "#fff",
					}}
				>
					{SEARCH_MODE.map((mode) => (
						<li
							key={mode.id}
							style={{
								padding: "10px",
								cursor: "pointer",
							}}
							onClick={() => {
								actions.mode.change(mode.id)
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
