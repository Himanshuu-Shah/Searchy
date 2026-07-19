import { useSearchSession } from "../../session/useSearchSession"

export type LiteralConfig = {
	caseSensitive: boolean
	wholeWord: boolean
}

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
					onChange={(e) =>
						actions.literal.setWholeWord(e.target.checked)
					}
				/>
				Whole Word
			</label>

			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={session.config.literal.caseSensitive}
					onChange={(e) =>
						actions.literal.setCaseSensitive(e.target.checked)
					}
				/>
				Case Sensitive
			</label>
		</>
	)
}
