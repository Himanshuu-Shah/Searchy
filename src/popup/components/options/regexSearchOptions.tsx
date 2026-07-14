import type { RegexConfig } from "../../../shared/search/algorithmConfigs"

type RegexOptionsProps = {
	config: RegexConfig
	updateConfig: (property: keyof RegexConfig, value: boolean) => void
}

export function RegexOptions({ config, updateConfig }: RegexOptionsProps) {
	return (
		<>
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
				Whole Word
			</label>
		</>
	)
}
