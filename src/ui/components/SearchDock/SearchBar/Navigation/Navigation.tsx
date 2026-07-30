import {
	navigateNextIntent,
	navigatePreviousIntent,
} from "../../../../sendIntent"
import Button from "../../../Button/Button"
import "./Navigation.css"

export default function Navigation() {
	return (
		<div className="navigationContainer">
			<Button onClick={navigatePreviousIntent}>Prev</Button>
			12/24
			<Button onClick={navigateNextIntent}>Next</Button>
		</div>
	)
}
