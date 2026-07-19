import { useSearchSession } from "../session/useSearchSession"

export default function SearchInput() {
	const { session, actions } = useSearchSession()

	return (
		<form>
			<input
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
