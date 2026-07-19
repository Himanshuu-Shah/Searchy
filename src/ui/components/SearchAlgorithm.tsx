import { useState } from "react"
import type { SearchAlgorithm } from "../session/SearchSession"
import { useSearchSession } from "../session/useSearchSession"

const SEARCH_ALGORITHMS: {
	id: SearchAlgorithm
	name: string
	description: string
}[] = [
	{
		id: "literal",
		name: "Literal",
		description: "Find exact text matches",
	},
	{
		id: "regex",
		name: "Regex",
		description: "Search using regular expressions",
	},
]

export default function SearchAlgorithmSelector() {
	const [isOpen, setIsOpen] = useState(false)
	const { session, actions } = useSearchSession()

	const selectedAlgorithm = SEARCH_ALGORITHMS.find(
		(algorithm) => algorithm.id === session.algorithm
	)?.name

	return (
		<div style={{ position: "relative", width: "200px" }}>
			<button type="button" onClick={() => setIsOpen((open) => !open)}>
				{selectedAlgorithm}
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
					{SEARCH_ALGORITHMS.map((algorithm) => (
						<li
							key={algorithm.id}
							style={{
								padding: "10px",
								cursor: "pointer",
							}}
							onClick={() => {
								setIsOpen(false)
								actions.algorithm.change(algorithm.id)
							}}
						>
							{algorithm.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
