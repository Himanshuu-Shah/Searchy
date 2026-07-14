import type { LiteralConfig } from "../../../shared/search/algorithmConfigs"

type LiteralOptionsProps = {
	config: LiteralConfig
	updateConfig: (property: keyof LiteralConfig, value: boolean) => void
}

export function LiteralOptions({ config, updateConfig }: LiteralOptionsProps) {
	return (
		<>
			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={config.wholeWord}
					onChange={(e) =>
						updateConfig("wholeWord", e.target.checked)
					}
				/>
				Whole Word
			</label>

			<label
				style={{ display: "flex", alignItems: "center", gap: "6px" }}
			>
				<input
					type="checkbox"
					checked={config.caseSensitive}
					onChange={(e) =>
						updateConfig("caseSensitive", e.target.checked)
					}
				/>
				Case Sensitive
			</label>
		</>
	)
}
