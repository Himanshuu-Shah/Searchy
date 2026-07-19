import { useSearchSession } from "../../../../../session/useSearchSession"

export type RegexConfig = {
	caseSensitive: boolean
}

export function RegexConfig() {
	const { session, actions } = useSearchSession()

	return (
		<>
			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={session.config.regex.caseSensitive}
					onChange={(e) =>
						actions.regex.setCaseSensitive(e.target.checked)
					}
				/>
				Whole Word
			</label>
		</>
	)
}
