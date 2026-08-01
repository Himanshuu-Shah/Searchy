import { updateRegexCaseSensitive } from "../../../../../sendIntent"
import { useSearchSession } from "../../../../../session/useSearchSession"

export function RegexConfig() {
	const { session } = useSearchSession()

	return (
		<>
			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={session.config.regex.caseSensitive}
					onChange={(e) => {
						const checked = e.target.checked
						updateRegexCaseSensitive(checked)
					}}
				/>
				Case Sensitive
			</label>
		</>
	)
}
