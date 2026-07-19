import { useSearchSession } from "../../../../session/useSearchSession"
import { LiteralConfig } from "./SearchConfig/LiteralConfig"
import { RegexConfig } from "./SearchConfig/RegexConfig"

export function SearchOptions() {
	const { session } = useSearchSession()
	switch (session.algorithm) {
		case "literal":
			return (
				<div className="config">
					<LiteralConfig />
				</div>
			)
		case "regex":
			return (
				<div className="config">
					<RegexConfig />
				</div>
			)
	}
}
