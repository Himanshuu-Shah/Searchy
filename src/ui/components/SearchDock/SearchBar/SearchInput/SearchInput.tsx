import { useSearchSession } from "../../../../session/useSearchSession"
import "./SearchInput.css"

export default function SearchInput() {
	const { session, actions } = useSearchSession()

	return (
		<form className="inputForm">
			<input
				className="inputBox"
				type="text"
				placeholder="Search"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault()
					}
				}}
				value={session.query}
				onChange={(e) => actions.query.change(e.target.value)}
			/>
		</form>
	)
}
