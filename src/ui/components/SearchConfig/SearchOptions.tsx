import { useSearchSession } from "../../session/useSearchSession"
import { LiteralConfig } from "./LiteralConfig"
import { RegexConfig } from "./RegexConfig"

export function SearchOptions() {
	const { session } = useSearchSession()
	switch (session.algorithm) {
		case "literal":
			return <LiteralConfig />
		case "regex":
			return <RegexConfig />
	}
}
