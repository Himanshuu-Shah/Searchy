import { useState } from "react"
import type { SearchAlgorithm } from "../../../../shared/messages/session/SearchSession"
import { useSearchSession } from "../../../session/useSearchSession"
import Button from "../../Button/Button"
import { updateAlgorithmIntent } from "../../../sendIntent"
import "./SearchAlgorithm.css"
import "../../../styles/dropdown.css"

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
	const { session } = useSearchSession()

	const selectedAlgorithm = SEARCH_ALGORITHMS.find(
		(algorithm) => algorithm.id === session.algorithm
	)?.name

	return (
		<div className="searchAlgorithmSelector">
			<Button type="button" onClick={() => setIsOpen((open) => !open)}>
				{selectedAlgorithm}
			</Button>

			{isOpen && (
				<ul className="dropdown">
					{SEARCH_ALGORITHMS.map((algorithm) => (
						<li
							key={algorithm.id}
							onClick={() => {
								const currentAlgorithm = algorithm.id

								updateAlgorithmIntent(currentAlgorithm)
								setIsOpen(false)
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
