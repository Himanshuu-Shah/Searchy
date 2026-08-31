import { clearSelectedScope, toggleScopeSelection } from "../../../sendIntent"
import { useSearchSession } from "../../../session/useSearchSession"
import Button from "../../Button/Button"

export function ScopeControls() {
	const { session } = useSearchSession()

	return (
		session.mode === "local" && (
			<>
				<Button
					className="select-scope"
					type="button"
					onClick={() =>
						toggleScopeSelection(!session.scopeSelection.enabled)
					}
				>
					Select Scope
				</Button>
				<Button
					className="clear-scope"
					type="button"
					onClick={() => clearSelectedScope()}
				>
					Clear Scope
				</Button>
			</>
		)
	)
}
