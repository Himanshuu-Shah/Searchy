import {
	navigateNextIntent,
	navigatePreviousIntent,
} from "../../../../sendIntent"
import { useSearchSession } from "../../../../session/useSearchSession"
import Button from "../../../Button/Button"
import "./Navigation.css"

export default function Navigation() {
	const { session } = useSearchSession()
	return (
		<div className="navigationContainer">
			<Button onClick={navigatePreviousIntent}>Prev</Button>
			{session.results.currentIndex + 1} / {session.results.totalMatches}
			<Button onClick={navigateNextIntent}>Next</Button>
		</div>
	)
}
