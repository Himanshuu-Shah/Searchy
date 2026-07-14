import { useState } from "react"
import type { SearchAlgorithms } from "../state/algorithms"
import { SEARCH_ALGORITHMS } from "../state/algorithms"

type AlgorithmSelectorProps = {
	selected: SearchAlgorithms
	changeAlgorithm: (algorithm: SearchAlgorithms) => void
}

export function AlgorithmSelector({
	selected,
	changeAlgorithm,
}: AlgorithmSelectorProps) {
	const [isOpen, setIsOpen] = useState(false)

	const selectedAlgorithm = SEARCH_ALGORITHMS.find(
		(algorithm) => algorithm.id === selected
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
								changeAlgorithm(algorithm.id)
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
