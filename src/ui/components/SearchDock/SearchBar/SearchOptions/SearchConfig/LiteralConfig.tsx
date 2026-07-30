import {
	updateLiteralCaseSensitive,
	updateLiteralWholeWord,
} from "../../../../../sendIntent"
import { useSearchSession } from "../../../../../session/useSearchSession"

export function LiteralConfig() {
	const { session, actions } = useSearchSession()

	return (
		<>
			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={session.config.literal.wholeWord}
					onChange={(e) => {
						const checked = e.target.checked
						actions.literal.setWholeWord(checked)
						updateLiteralWholeWord(checked)
					}}
				/>
				Whole Word
			</label>

			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={session.config.literal.caseSensitive}
					onChange={(e) => {
						const checked = e.target.checked
						actions.literal.setCaseSensitive(checked)
						updateLiteralCaseSensitive(checked)
					}}
				/>
				Case Sensitive
			</label>
		</>
	)
}
