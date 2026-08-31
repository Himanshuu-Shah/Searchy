import Button from "../Button/Button"
import { useView } from "../../view/useView"
import "./GlobalResultsToggle.css"

export default function GlobalResultsToggle() {
	const { viewState, viewActions } = useView()

	return (
		<Button
			className="globalResultsToggle"
			onClick={(e) => {
				e.preventDefault()
				viewActions.toggleGlobalResults()
			}}
		>
			{viewState.globalResultsVisible ? "⌄" : "^"}
		</Button>
	)
}
